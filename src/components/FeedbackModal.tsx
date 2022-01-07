import * as React from 'react';
import classnames from 'classnames';
import './FeedbackModal.scss';
import { Body, Button, InputGroup, Modal, ModalButtonBar, Radio, Textarea } from '@itwin/itwinui-react';

export type Feedback = { rating: number; comment: string };

export type FeedBackModalProps = {
  onFeedbackSubmit?: (feedback: Feedback) => void;
};

export const FeedbackModal = (props: FeedBackModalProps) => {
  const { onFeedbackSubmit } = props;

  const [isModalOpen, setIsModalOpen] = React.useState(false);

  const [rating, setRating] = React.useState(0);
  const [comment, setComment] = React.useState('');

  const closeModal = React.useCallback(() => {
    setIsModalOpen(false);
    setRating(0);
    setComment('');
  }, []);

  return (
    <>
      {isModalOpen && (
        <Modal isOpen={isModalOpen} onClose={closeModal} title={'How helpful was this report?'}>
          <div className='isr-feedback-modal-body'>
            <InputGroup label='' message='1 = Poor, 5 = Excellent'>
              <Radio name='choice' label='1' onChange={() => setRating(1)} />
              <Radio name='choice' label='2' onChange={() => setRating(2)} />
              <Radio name='choice' label='3' onChange={() => setRating(3)} />
              <Radio name='choice' label='4' onChange={() => setRating(4)} />
              <Radio name='choice' label='5' onChange={() => setRating(5)} />
            </InputGroup>
            <Body className='isr-feedback-modal-question'>Why did you give us this rating?</Body>
            <Textarea
              placeholder='What was helpful? How can we make the report more useful?'
              value={comment}
              onChange={(e) => {
                setComment(e.target.value);
              }}
            />
          </div>

          <ModalButtonBar>
            <Button
              disabled={rating == 0 || comment == ''}
              styleType='high-visibility'
              onClick={() => {
                onFeedbackSubmit && onFeedbackSubmit({ rating, comment });
                closeModal();
              }}
            >
              Send feedback
            </Button>
            <Button onClick={closeModal}>Dismiss</Button>
          </ModalButtonBar>
        </Modal>
      )}

      <div className='isr-feedback-modal-text-container'>
        <a
          className='isr-feedback-modal-text'
          onClick={() => {
            setIsModalOpen(true);
          }}
        >
          Help us improve
        </a>
      </div>
    </>
  );
};

export default FeedbackModal;
