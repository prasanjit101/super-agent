'use client';
import { FeedbackWidget, FeedbackWidgetProps } from '@mindship/react';

export const Feedback = ({
  teamId,
  title = 'Rate your experience',
  description = 'Your feedback helps us serve you better',
  position = 'bottom-right',
  primaryColor = '#ff832ade',
  textColor = '#292524',
}: FeedbackWidgetProps) => {
  return (
    <FeedbackWidget
      teamId={teamId}
      title={title}
      description={description}
      position={position}
      primaryColor={primaryColor}
      textColor={textColor}
    />
  );
};
