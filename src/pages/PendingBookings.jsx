import React from 'react';
import BookingsManagement from './BookingsManagement';

const PendingBookings = () => {
  return <BookingsManagement filter="pending" />;
};

export default PendingBookings;
