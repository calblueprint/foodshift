# Make sure these variables are set in .bash_profile or something.
# Later, for Heroku environment variables, check out:
# https://devcenter.heroku.com/articles/config-vars

CarrierWave.configure do |config|
  config.fog_credentials = {
    provider: ENV["FOG_PROVIDER"],
    aws_access_key_id: ENV["AWS_ACCESS_KEY_ID"],
    aws_secret_access_key: ENV["AWS_SECRET_ACCESS_KEY"],
    region: ENV["FOG_REGION"]
  }
  config.fog_directory  = ENV["FOG_DIRECTORY"]
end
