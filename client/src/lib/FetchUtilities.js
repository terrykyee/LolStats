//@flow
/**
 * @file Utilities for use with fetch and building up REST requests
 */
import {
  DataAccessError,
  UnauthenticatedDataAccessError,
  UnauthorizedDataAccessError,
  PermanentDataAccessError,
  TemporaryDataAccessError,
  NotFoundDataAccessError,
} from './NetworkUtilities';

export const FetchConstants = {
  METHOD_POST: 'POST',
  METHOD_PUT: 'PUT',
  METHOD_GET: 'GET',
  NO_CORS: 'no-cors',
  CORS: 'cors',
  HEADER_CONTENT_TYPE: 'Content-Type',
  CONTENT_TYPE_JSON: 'application/json',
  CONTENT_TYPE_TEXT: 'text/plain',
  CONTENT_TYPE_FORM_URL_ENCODED: 'application/x-www-form-urlencoded',
};

/**
 * Checks for a response successful HTTP status code (2xx) and if it is not successful, throw
 * a HttpDataAccessError.
 * @param response - response
 * @param responseStatus - response status code
 * @param message - Message to include in any exceptions
 */
export function checkHttpStatusCode(response: any, responseStatus: number, message: string) {
  if (responseStatus === null) {
    throw new DataAccessError(message, Date.now(), response);
  }

  if (responseStatus >= 200 && responseStatus < 400) {
    return;
  }

  if (responseStatus === 401) {
    throw new UnauthenticatedDataAccessError(message, Date.now(), response);
  }

  if (responseStatus === 403) {
    throw new UnauthorizedDataAccessError(message, Date.now(), response);
  }

  if (responseStatus === 404) {
    throw new NotFoundDataAccessError(message, Date.now(), response);
  }

  if (responseStatus >= 400 && responseStatus < 500) {
    // These are bad responses of some kind, they aren't going to fix themselves
    throw new PermanentDataAccessError(message, Date.now(), response);
  }

  if (responseStatus >= 500) {
    // These are temporary server side failure conditions, retry them
    throw new TemporaryDataAccessError(message, Date.now(), response);
  }
}
