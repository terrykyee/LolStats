//@flow
/**
 * @file Network communication utilities
 */
import ExtendableError from 'extendable-error-class';

/**
 * Base class for errors.
 */
export class DataAccessError extends ExtendableError {
  /**
   * The message associated with this error.
   */
  message: string;

  /**
   * The time the error was encountered in ms.
   */
  timestampMs: number;

  /**
   * Any data relevant for further information on this error.
   */
  details: ?any;

  constructor(message: string, timestampMs: number, details: ?any) {
    super(message);
    this.message = message;
    this.timestampMs = timestampMs;
    this.details = details;
  }
}

export class UnauthenticatedDataAccessError extends DataAccessError {
}

export class UnauthorizedDataAccessError extends DataAccessError {
}

export class NotFoundDataAccessError extends DataAccessError {
}

export class PermanentDataAccessError extends DataAccessError {
}

export class TemporaryDataAccessError extends DataAccessError {
}

/**
 * Class used to denote no data found on a data retrieval
 */
export class EmptyData {
}