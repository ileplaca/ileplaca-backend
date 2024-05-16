import { ethers } from "ethers"
import * as fs from 'fs';
import { CompaniesSalaries } from '../smart-contract/companies-salaries.types';
import { PassingSecretInfo } from '../smart-contract/passing-secret-info.types';
const path = require('path')

import * as dotenv from 'dotenv'
dotenv.config()

// const ACCOUNT_ADDRESS = "0x9f2d4543c800944b30B5492516be66DD7588Bd26"

const PASSING_SECRET_INFO_ADDRESS = "0x081cBC77C642aD79826F8996356EE7aAF6d641Ec"
const PASSING_SECRET_INFO_INFURA_ID = '9a481fee97b347e9aeb156e29f4dcb7a'

const COMPANIES_SALARIES_ADDRESS = "0x6cAD76e90a91Dcc9cF3C91e39E4eA945740baFdB"
const COMPANIES_SALARIES_INFURA_ID = '0447ae5d4130470d803814b06406a57a'

function getAbi (ABI_FILE_PATH: string) {
  const data = fs.readFileSync(ABI_FILE_PATH, 'utf-8');
  const abi = JSON.parse(data)['abi'];
  return abi;
}

export function getSmartContracts () {
  let passingSecretInfoProvider = ethers.getDefaultProvider(`https://sepolia.infura.io/v3/${PASSING_SECRET_INFO_INFURA_ID}`);
  const passingSecretInfoAbi = getAbi(path.resolve(__dirname, '../utils/data/passing-secret-info-abi.json'))

  let companiesSalariesProvider = ethers.getDefaultProvider(`https://sepolia.infura.io/v3/${COMPANIES_SALARIES_INFURA_ID}`);
  const companiesSalariesAbi = getAbi(path.resolve(__dirname, '../utils/data/companies-salaries-abi.json'))

  let passingSecretInfoSigner = new ethers.Wallet(process.env.PRIVATE_KEY, passingSecretInfoProvider);
  let companiesSalariesSigner = new ethers.Wallet(process.env.PRIVATE_KEY, companiesSalariesProvider);

  const passingSecretInfoContract = new ethers.Contract
    (PASSING_SECRET_INFO_ADDRESS, passingSecretInfoAbi, passingSecretInfoSigner) as unknown as PassingSecretInfo;
  const companiesSalariesContract = new ethers.Contract
    (COMPANIES_SALARIES_ADDRESS, companiesSalariesAbi, companiesSalariesSigner) as unknown as CompaniesSalaries;

  return {
    passingSecretInfoContract,
    companiesSalariesContract
  }
}

export const {
  passingSecretInfoContract,
  companiesSalariesContract
} = getSmartContracts()