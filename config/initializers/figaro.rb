# config/initializers/figaro.rb

Figaro.require_keys(
  "EMAIL_USERNAME",
  "EMAIL_PASSWORD",
  "AWS_ACCESS_KEY_ID",
  "AWS_SECRET_ACCESS_KEY",
  "FOG_PROVIDER",
  "FOG_REGION",
  "FOG_DIRECTORY"
)
