const express = require('express');
const path = require('path');
const { v4: uuidv4 } = require('uuid');
const multer = require('multer');
const router = express.Router();
const gravatar = require('gravatar');
const auth = require('../../middleware/auth');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');
const { check, validationResult } = require('express-validator');
const normalize = require('normalize-url');
const { ethers } = require('ethers')

const { TOKEN_URIS } = require('./ABC2-M_summary.js')
const User = require('../../models/User');

const NFT_ADDRESS = '0xfFA4683b9aC4aAD95416804f4cac0e23f527F63c'
const PRICE = 0.05

const seed = "era oppose ivory elephant fatal today melody entry muffin donkey this involve"
const NFT_ABI = [
  {
    "inputs": [
      {
        "internalType": "string[]",
        "name": "tokenUris",
        "type": "string[]"
      }
    ],
    "name": "mint",
    "outputs": [],
    "stateMutability": "payable",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "totalSupply",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  }
]

const rinkebynet = 'https://rinkeby.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161';
const mainnet = 'https://mainnet.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161';

const eth_provider = new ethers.providers.JsonRpcProvider(rinkebynet)


var minterWallet = new ethers.Wallet.fromMnemonic(seed)
var minterSigner = minterWallet.connect(eth_provider)
var contract = new ethers.Contract(NFT_ADDRESS, NFT_ABI, minterSigner)

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'images');
  },
  filename: function (req, file, cb) {
    cb(null, uuidv4() + '-' + Date.now() + path.extname(file.originalname));
  }
});

const fileFilter = (req, file, cb) => {
  const allowedFileTypes = ['image/jpeg', 'image/jpg', 'image/png'];
  if (allowedFileTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(null, false);
  }
}

let upload = multer({ storage, fileFilter });

// @route    POST api/users
// @desc     Register user
// @access   Public
router.post(
  '/',
  check('name', 'First Name is required').notEmpty(),
  check('email', 'Please include a valid email').isEmail(),
  check(
    'password',
    'Please enter a password with 6 or more characters'
  ).isLength({ min: 6 }),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, email, phone, password } = req.body;

    try {
      let user = await User.findOne({ email });

      if (user) {
        return res
          .status(400)
          .json({ errors: [{ msg: 'User already exists' }] });
      }

      const avatar = normalize(
        gravatar.url(email, {
          s: '200',
          r: 'pg',
          d: 'mm'
        }),
        { forceHttps: true }
      );

      user = new User({
        name,
        phone,
        email,
        avatar,
        password
      });

      const salt = await bcrypt.genSalt(10);

      user.password = await bcrypt.hash(password, salt);

      await user.save();

      const payload = {
        user: {
          id: user.id
        }
      };

      jwt.sign(
        payload,
        "config_get('jwtSecret')",
        { expiresIn: '5 days' },
        (err, token) => {
          if (err) throw err;
          res.json({ token });
        }
      );
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server error');
    }
  }
);


router.post(
  '/savedetail',
  auth,
  upload.single('avatar'),
  check('email', 'Please include a valid email').isEmail(),
  check('name', 'Name is required').notEmpty(),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const id = req.user.id;
    // console.log(req);
    let userDetail = { ...req.body, avatar: req.file?.filename };
    if (!req.file) {
      delete userDetail.avatar;
    }
    // const { firstName, lastName, email, phone } = req.body;
    try {
      await User.findOneAndUpdate(
        { _id: id },
        { $set: userDetail }
      )
      let user = await User.findById(id).select('-password');
      // console.log(user);
      return res.json(user);
    } catch (err) {
      console.error(err.message);
      return res.status(500).send('Server Error');
    }
  }
)

router.post(
  '/resetpassword',
  auth,
  check('curPassword', 'Current password is required').exists(),
  check(
    'password',
    'Please enter a password with 6 or more characters'
  ).isLength({ min: 6 }),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { curPassword, password } = req.body;
    try {
      let user = await User.findById(req.user.id);
      if (!user) {
        return res
          .status(400)
          .json({ errors: [{ msg: 'Please sign in first' }] });
      }

      const isMatch = await bcrypt.compare(curPassword, user.password);

      if (!isMatch) {
        return res.status(400).json({ errors: [{ msg: 'Current password is incorrect' }] })
      }

      const salt = await bcrypt.genSalt(10);
      newPassword = await bcrypt.hash(password, salt);

      user = await User.findOneAndUpdate({ _id: req.user.id }, { $set: { password: newPassword } });

      return res.json(user);

    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server error');
    }
  }
)

router.post('/buy', auth, async (req, res) => {
  try {
    let id = req.user.id
    let amount = Number(req.body.amount)

    /**   Mint */
    let tokenCounter = Number(await contract.totalSupply());
    let mintUris = TOKEN_URIS.slice(tokenCounter, tokenCounter + amount);
    console.log('mint tokenUris', mintUris);
    const options = { value: ethers.utils.parseEther((PRICE * amount).toString()) }
    let result = await contract.mint(mintUris, options)
    if (result.from) {
      console.log(`${result.from} minted ${amount} NFTs`)
      /**   Update DB */
      let nftIds = (await User.findById(id)).nftIds
      for (let i = 0; i < amount; i++) {
        nftIds.push(tokenCounter + i)
      }
      let user = await User.findOneAndUpdate({ _id: id }, { $set: { nftIds } })

      res.json(true)
    } else {
      res.json(false)
    }

  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
})

module.exports = router;
