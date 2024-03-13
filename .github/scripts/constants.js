const ENV_PARAMS = [
  {
    var_name: 'ACCOUNT_ID',
    key: 'account_id',
  },
  {
    var_name: 'API_AWS_REGION',
    key: 'aws_region',
  },
  {
    var_name: 'COMPANY_NAME',
    key: 'company_name',
  },
  {
    var_name: 'RECAPTCHA_SECRET',
    key: 'recaptcha_secret',
  },
  {
    var_name: 'CMC_API_KEY',
    key: 'cmc_api_key',
  },
  {
    var_name: 'BAD_WORDS_API_KEY',
    key: 'bad_words_api_key',
  },
  {
    var_name: 'PUBLIC_BUCKET_NAME',
    key: 'public_bucket_name',
  },
  {
    var_name: 'KYC_FROM_EMAIL',
    key: 'kyc_from_email',
  },
  {
    var_name: 'KYC_SUPPORT_EMAIL',
    key: 'kyc_support_email',
  },
  {
    var_name: 'PAYMENT_RECEIVER',
    key: 'payment_receiver',
  },
  {
    var_name: 'SUPPORTS_ALL_COUNTRIES',
    key: 'supports_all_countries',
  },
  {
    var_name: 'BASE_URL',
    key: 'launchpad_base_url',
  },
  {
    var_name: 'API_SECRET',
    key: 'app_secret',
    staged: true,
  },
  {
    var_name: 'CHAIN_ID',
    key: 'default_chain_id',
    staged: true,
  },
  {
    var_name: 'CHATBOT_SECRET',
    key: 'chatbot_secret',
    staged: true,
  },
  {
    var_name: 'COGNITO_CLIENT_ID',
    key: 'cognito_client_id',
    staged: true,
  },
  {
    var_name: 'COGNITO_POOL_ID',
    key: 'cognito_pool_id',
    staged: true,
  },
  {
    var_name: 'CONTRACTS',
    key: 'contracts',
    staged: true,
    json: true,
  },
  {
    var_name: 'CONTRACT_DEPLOY_QUEUE',
    key: 'contract_deployer_queue',
    staged: true,
  },
  {
    var_name: 'DB_CONFIG',
    key: 'db_config',
    staged: true,
    json: true,
  },
  {
    var_name: 'KYC_PROVIDER_API_KEY',
    key: 'kyc_provider_api_key',
    staged: true,
  },
  {
    var_name: 'KYC_PROVIDER_SECRET_KEY',
    key: 'kyc_provider_secret_key',
    staged: true,
  },
  {
    var_name: 'KYC_PROVIDER_BASE_URL',
    key: 'kyc_provider_base_url',
    staged: true,
  },
  {
    var_name: 'MNEMONIC_PHRASE',
    key: 'mnemonic_phrase',
    staged: true,
  },
  {
    var_name: 'SLACK_APPROVER_TOKEN',
    key: 'slack_bot_token',
    staged: true,
  },
];

module.exports = {
  ENV_PARAMS,
};
