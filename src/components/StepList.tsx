import { useState, ChangeEvent, useRef } from 'react';
import { DropResult, DragDropContext, Draggable } from 'react-beautiful-dnd';
import {
  RiCloseFill,
  RiAddFill,
  RiArrowDownSLine,
  RiArrowUpSLine,
  RiCloseCircleFill,
} from 'react-icons/ri';
import { RxDragHandleDots2 } from 'react-icons/rx';
import { StrictModeDroppable } from '~/utils/StrictModeDroppable';
import Textarea from './elements/Textarea';
import useAutosizeTextArea from '~/hooks/useAutosizeTextArea';
import Button from './elements/Button';

const dummySteps = [
  {
    id: 'step-001',
    description: 'Buy a set of DJ turntables and a mixer.',
  },
  {
    id: 'step-002',
    description: 'Train your cat to respond to certain sounds or commands.',
  },
  {
    id: 'step-003',
    description:
      'Attach a special collar with sensors that can trigger the turntables and mixer.',
  },
  {
    id: 'step-004',
    description: 'Play music and watch your cat scratch and mix the beats.',
  },
  {
    id: 'step-005',
    description:
      'Upload the videos to social media and become internet famous.',
  },
];

export default function StepList() {
  const [steps, updateSteps] = useState(dummySteps);

  function handleOnDragEnd(result: DropResult) {
    if (!result.destination) return;

    const items = Array.from(steps);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    updateSteps(items);
  }

  function handleInputChange(event: ChangeEvent<HTMLInputElement>, id: string) {
    const updatedSteps = steps.map((step) => {
      if (step.id === id) {
        return {
          id: id,
          description: event.target.value,
        };
      } else {
        return step;
      }
    });
    updateSteps(updatedSteps);
  }

  function handleAddStep() {
    const updatedSteps = [
      ...steps,
      { id: crypto.randomUUID(), description: '' },
    ];
    updateSteps(updatedSteps);
  }

  function handleDeleteStep(id: string) {
    const updatedSteps = steps.filter((step) => step.id !== id);
    updateSteps(updatedSteps);
  }

  return (
    <div className="">
      <DragDropContext onDragEnd={handleOnDragEnd}>
        <StrictModeDroppable droppableId="steps">
          {(provided) => (
            <ul
              className="steps"
              {...provided.droppableProps}
              ref={provided.innerRef}
            >
              {steps.map((step, index) => {
                return (
                  <DraggableStepItem
                    key={step.id}
                    steps={steps}
                    step={step}
                    index={index}
                    handleInputChange={handleInputChange}
                    handleDeleteStep={handleDeleteStep}
                  />
                );
              })}
              {provided.placeholder}
            </ul>
          )}
        </StrictModeDroppable>
      </DragDropContext>
      <div className="flex items-center justify-center gap-2 text-teal-500">
        <Button
          outline
          rounded
          loading={false}
          className="flex-grow-0"
          onClick={handleAddStep}
        >
          <RiAddFill className="text-2xl" />
        </Button>
        Add Step
      </div>
    </div>
  );
}

function DraggableStepItem({
  steps,
  step,
  index,
  handleInputChange,
  handleDeleteStep,
}) {
  const [showTextarea, setShowTextArea] = useState(false);
  const handleShowTextarea = () => setShowTextArea((prev) => !prev);
  const stepDescriptionRef = useRef<HTMLTextAreaElement>(null);
  useAutosizeTextArea(stepDescriptionRef.current, step.description, 3);

  return (
    <Draggable draggableId={step.id} index={index}>
      {(provided) => (
        <li
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          className="my-3 bg-white"
        >
          <div className="flex">
            <div className="mr-1 mt-2 inline-block text-gray-400">
              <RxDragHandleDots2 className="text-2xl" />
            </div>
            <div className="w-full">
              <div
                className="relative flex items-center bg-teal-500 p-2 text-white"
                onClick={handleShowTextarea}
              >
                <span className="ml-2 font-bold">
                  Step {steps.indexOf(step) + 1}
                </span>

                <div className="mx-1 inline-block text-2xl">
                  {showTextarea ? <RiArrowUpSLine /> : <RiArrowDownSLine />}
                </div>
                <div
                  onClick={() => handleDeleteStep(step.id)}
                  className="absolute right-2 text-2xl"
                >
                  <RiCloseCircleFill />
                </div>
              </div>
              {showTextarea && (
                <Textarea
                  id="stepDescription"
                  ref={stepDescriptionRef}
                  value={step.description}
                  rows={3}
                  placeholder="Enter step..."
                  className="w-full"
                  onChange={(e) => handleInputChange(e, step.id)}
                />
              )}
            </div>
          </div>
        </li>
      )}
    </Draggable>
  );
}
