"use strict";
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.companiesSalariesContract = exports.passingSecretInfoContract = exports.getSmartContracts = void 0;
const ethers_1 = require("ethers");
const fs = require("fs");
const path = require('path');
const dotenv = require("dotenv");
dotenv.config();
const PASSING_SECRET_INFO_ADDRESS = "0x081cBC77C642aD79826F8996356EE7aAF6d641Ec";
const PASSING_SECRET_INFO_INFURA_ID = '9a481fee97b347e9aeb156e29f4dcb7a';
const COMPANIES_SALARIES_ADDRESS = "0x6cAD76e90a91Dcc9cF3C91e39E4eA945740baFdB";
const COMPANIES_SALARIES_INFURA_ID = '0447ae5d4130470d803814b06406a57a';
function getAbi(ABI_FILE_PATH) {
    const data = fs.readFileSync(ABI_FILE_PATH, 'utf-8');
    const abi = JSON.parse(data)['abi'];
    return abi;
}
function getSmartContracts() {
    let passingSecretInfoProvider = ethers_1.ethers.getDefaultProvider(`https://sepolia.infura.io/v3/${PASSING_SECRET_INFO_INFURA_ID}`);
    const passingSecretInfoAbi = getAbi(path.resolve(__dirname, '../utils/data/passing-secret-info-abi.json'));
    let companiesSalariesProvider = ethers_1.ethers.getDefaultProvider(`https://sepolia.infura.io/v3/${COMPANIES_SALARIES_INFURA_ID}`);
    const companiesSalariesAbi = getAbi(path.resolve(__dirname, '../utils/data/companies-salaries-abi.json'));
    let passingSecretInfoSigner = new ethers_1.ethers.Wallet(process.env.PRIVATE_KEY, passingSecretInfoProvider);
    let companiesSalariesSigner = new ethers_1.ethers.Wallet(process.env.PRIVATE_KEY, companiesSalariesProvider);
    const passingSecretInfoContract = new ethers_1.ethers.Contract(PASSING_SECRET_INFO_ADDRESS, passingSecretInfoAbi, passingSecretInfoSigner);
    const companiesSalariesContract = new ethers_1.ethers.Contract(COMPANIES_SALARIES_ADDRESS, companiesSalariesAbi, companiesSalariesSigner);
    return {
        passingSecretInfoContract,
        companiesSalariesContract
    };
}
exports.getSmartContracts = getSmartContracts;
_a = getSmartContracts(), exports.passingSecretInfoContract = _a.passingSecretInfoContract, exports.companiesSalariesContract = _a.companiesSalariesContract;
//# sourceMappingURL=index.js.map