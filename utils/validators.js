const VALID_STATUSES = ['To Do', 'In Progress', 'Completed'];

function validateStatus(status) {
  return VALID_STATUSES.includes(status);
}

function validateCreate(body) {
  const errors = [];
  if (!body.title || typeof body.title !== 'string' || body.title.trim().length === 0) {
    errors.push('Title is required and must be a non-empty string.');
  }
  if (body.status && !validateStatus(body.status)) {
    errors.push(`Status must be one of: ${VALID_STATUSES.join(', ')}`);
  }
  return errors;
}

function validateUpdate(body) {
  const errors = [];
  if (body.title !== undefined && (typeof body.title !== 'string' || body.title.trim().length === 0)) {
    errors.push('If provided, title must be a non-empty string.');
  }
  if (body.status !== undefined && !validateStatus(body.status)) {
    errors.push(`If provided, status must be one of: ${VALID_STATUSES.join(', ')}`);
  }
  return errors;
}

module.exports = { VALID_STATUSES, validateStatus, validateCreate, validateUpdate };
