# Article with ads

https://wsromek.github.io/cloudinary-ads-frontend

## About

To achieve the desired result I decided to prepare a simplest possible website.
The website is configured to communicate with the deployed Heroku version of the application.

## How to run?

For local development AD_SERVICE in `js/tracker.js` needs to be updated to local deployment of ad-tracker

Please use any one-liner HTTP server with current directory as root.

List of one liners: https://gist.github.com/willurd/5720255

## Considerations 
 * sendBeacon as prefered transport for analytics events
 * polyfill.io as automated polyfiller

