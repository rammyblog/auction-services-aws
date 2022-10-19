import AWS from 'aws-sdk';
import createHttpError from 'http-errors';

const dynamodb = new AWS.DynamoDB.DocumentClient();
export async function updatePictureUrl(pictureUrl, id) {
  let updatedAuction;
  const params = {
    TableName: process.env.AUCTIONS_TABLE_NAME,
    Key: { id },
    UpdateExpression: 'set pictureUrl = :pictureUrl',
    ExpressionAttributeValues: {
      ':pictureUrl': pictureUrl,
    },
    ReturnValues: 'ALL_NEW',
  };

  try {
    const result = await dynamodb.update(params).promise();
    updatedAuction = result.Attributes;
  } catch (error) {
    console.log(error);
    throw new createHttpError.InternalServerError(error);
  }
  return updatedAuction;
}
