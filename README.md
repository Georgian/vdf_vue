# "Vârf de Formă" https://varfdeforma.ro

> Rougly translated to "Peak Performance", VDF is a personal project written with love and care written in little spare time. 

## Tutorials

https://dev.to/adnanrahic/a-crash-course-on-serverless-side-rendering-with-vuejs-nuxtjs-and-aws-lambda-1nk4

## Setup

- For new AWS accounts:
  1. Create an IAM user with policies: AWSCertificateManagerReadOnly, AmazonAPIGatewayAdministrator
  2. Create a Hosted Zone in Route53
  3. Request a certificate from AWS Certificate Manager with *.varfdeforma.ro and varfdeforma.ro, 
     then create a CNAME Record Set with domains listed in the certificate. This can be created
     automatically from the Certificate Manager by "Create record in Route 53" button.
  4. sls create_domain
  5. Remember to update nameservers in domain administration
  
- For developing on new machines:
  1. npm i -g serverless
  2. serverless config credentials --provider aws --key xxxxxxxxxxxxxx --secret xxxxxxxxxxxxxx

## Deploying

* npm run deploy

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8082
npm run dev
```

For a detailed explanation on how things work, check out the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).
