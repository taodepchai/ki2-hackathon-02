import React from 'react';

interface NotificationProps {
  message: string;
  type: 'success' | 'warning' | 'error';
}

const Notification: React.FC<NotificationProps> = ({ message, type }) => {
  return (
    <div className={`notification ${type}`}>
      {message}
    </div>
  );
};

export default Notification;
