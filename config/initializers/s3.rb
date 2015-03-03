# Make sure these variables are set in .bash_profile or something.
# Later, for Heroku environment variables, check out:
# https://devcenter.heroku.com/articles/config-vars

CarrierWave.configure do |config|
  config.fog_credentials = {
    provider: "AWS",
    aws_access_key_id: ENV["S3_KEY"],
    aws_secret_access_key: ENV["S3_SECRET"],
    region: ENV["S3_REGION"]
  }
  config.fog_directory  = ENV["S3_BUCKET"]
end
