'use strict';

const AWS = require('aws-sdk');
AWS.config.update({region:'us-east-1'});
const dynamoDb = new AWS.DynamoDB.DocumentClient();


module.exports.get = (productId, callback) => {

  const params = {
    TableName: process.env.DYNAMODB_TABLE,
    Key: {
      productId: productId
    }
  };

  dynamoDb.get(params, (error, result) => {
    if (error) {
      throw error;
    }
    callback.send(result.Item);
  });
};



module.exports.delete = (productId, callback) => {

  const params = {
    TableName: process.env.DYNAMODB_TABLE,
    Key: {
      productId: productId
    }
  };

  dynamoDb.delete(params, (error, result) => {
    if (error) {
      throw error;
    }

    callback.send(result.Item);
  });
};



module.exports.put = (product, callback) => {
  const timestamp = new Date().getTime();
  console.log(product);
  const productDocument = JSON.parse(JSON.stringify(product));

  productDocument.createdAt = timestamp;
  productDocument.updatedAt = timestamp;

  const params = {
    TableName: process.env.DYNAMODB_TABLE,
    Item: productDocument
  };

  dynamoDb.put(params, (error) => {
    if (error) {
      throw error;
    }

    callback.send(params.Item);
  });
};


module.exports.scan = (callback) => {

  const params = {
    TableName: process.env.DYNAMODB_TABLE,
    Limit: 20
  };

  dynamoDb.scan(params, (error, result) => {
    if (error) {
      throw error;
    }

    callback.send(result.Items);
  });
};
