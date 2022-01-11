import * as React from 'react';
import './FeedbackModal.scss';
import { Button, InputGroup, LabeledTextarea, Modal, ModalButtonBar, Radio } from '@itwin/itwinui-react';

const defaultDisplayStrings = {
  modalButtonText: 'Help us improve',
  modalTitle: 'How helpful was this report?',
  inputGroupMessage: '1 = Poor, 5 = Excellent',
  textAreaTitle: 'Why did you give us this rating?',
  textAreaPlaceholder: 'What was helpful? How can we make the report more useful?',
  sendFeedbackButtonText: 'Send feedback',
  dismissButtonText: 'Dismiss',
};

export type Feedback = { rating: number; comment: string };

export type FeedBackModalProps = {
  onFeedbackSubmit: (feedback: Feedback) => void;
  displayStrings?: Partial<typeof defaultDisplayStrings>;
};

/**
 * Button that opens a modal to display a form to give feedback on the generated report.
 *
 * 'onFeedbackSubmit' is a callback triggered when the user clicks the 'Send feedback' button.
 */

export const FeedbackModal = (props: FeedBackModalProps) => {
  const { onFeedbackSubmit, displayStrings: passedInDisplayString } = props;

  const displayStrings = React.useMemo(
    () => ({ ...defaultDisplayStrings, ...passedInDisplayString }),
    [passedInDisplayString]
  );

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
        <Modal isOpen={isModalOpen} onClose={closeModal} title={displayStrings.modalTitle}>
          <div className='isr-feedback-modal-body'>
            <InputGroup label='' message={displayStrings.inputGroupMessage} className='isr-feedback-inputgroup'>
              <Radio name='rating' label='1' onChange={() => setRating(1)} />
              <Radio name='rating' label='2' onChange={() => setRating(2)} />
              <Radio name='rating' label='3' onChange={() => setRating(3)} />
              <Radio name='rating' label='4' onChange={() => setRating(4)} />
              <Radio name='rating' label='5' onChange={() => setRating(5)} />
            </InputGroup>

            <LabeledTextarea
              label={displayStrings.textAreaTitle}
              placeholder={displayStrings.textAreaPlaceholder}
              value={comment}
              onChange={(e) => {
                setComment(e.target.value);
              }}
              message={`${comment.length}/1000`}
              maxLength={1000}
            />
          </div>

          <ModalButtonBar>
            <Button
              disabled={rating == 0 || comment == ''}
              styleType='high-visibility'
              onClick={() => {
                onFeedbackSubmit({ rating, comment });
                closeModal();
              }}
            >
              {displayStrings.sendFeedbackButtonText}
            </Button>
            <Button onClick={closeModal}>{displayStrings.dismissButtonText}</Button>
          </ModalButtonBar>
        </Modal>
      )}

      <Button
        className='isr-feedback-button'
        styleType='borderless'
        size='small'
        onClick={() => {
          setIsModalOpen(true);
        }}
      >
        {displayStrings.modalButtonText}
      </Button>
    </>
  );
};

export default FeedbackModal;
