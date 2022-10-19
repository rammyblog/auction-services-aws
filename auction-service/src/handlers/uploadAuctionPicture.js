import middy from '@middy/core';
import httpErrorHandler from '@middy/http-error-handler';
import validator from '@middy/validator';
import createHttpError from 'http-errors';
import uploadPictureSchema from '../lib/schemas/uploadPictureSchema';
import { updatePictureUrl } from '../lib/updatePictureUrl';
import { uploadPictureToS3 } from '../lib/uploadPictureToS3';
import { getAuctionById } from './getAuction';
import cors from '@middy/http-cors';

export async function uploadAuctionPicture(event, context) {
  const { id } = event.pathParameters;
  const auction = await getAuctionById(id);
  const base64 = event.body.replace(/^data:image\/\w+;base64,/, '');
  const buffer = Buffer.from(base64, 'base64');
  const { email } = event.requestContext.authorizer;

  let updatedAuction;

  if (auction.seller !== email) {
    throw new createHttpError.Forbidden('You do not own this item');
  }
  try {
    const pictureUrl = await uploadPictureToS3(auction.id + '.jpg', buffer);
    // set picture in dynamoDB pictureUrl
    updatedAuction = await updatePictureUrl(pictureUrl, auction.id);
    return {
      statusCode: 200,
      body: JSON.stringify({ updatedAuction }),
    };
  } catch (error) {
    console.error(error);
    throw new createHttpError.InternalServerError(error);
  }
}

export const handler = middy(uploadAuctionPicture)
  .use(httpErrorHandler())
  .use(cors())
  .use(
    validator({
      inputSchema: uploadPictureSchema,
      ajvOptions: {
        useDefaults: true,
        strict: false,
      },
    })
  );
