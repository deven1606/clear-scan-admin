import React from 'react';
import BookingsManagement from './BookingsManagement';

const CancelledBookings = () => {
  return <BookingsManagement filter="cancelled" />;
};

export default CancelledBookings;
