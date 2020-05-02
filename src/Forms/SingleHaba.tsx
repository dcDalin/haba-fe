/* eslint-disable eqeqeq */
import React, { useState, useContext } from 'react';
import { Segment, Button, Form, Checkbox, Label, Popup } from 'semantic-ui-react';
import { useForm } from 'react-hook-form';
import HabaContext from '../context/HabaContext/habaContext';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import styles from './SingleHaba.module.scss';

interface Props {
  userName: string;
}

type FormData = {
  phoneNumber: string;
  payToUserName: string;
  amount: number;
  myName: string;
  message: string;
  isPrivate: boolean;
};

const SingleHaba: React.FC<Props> = (props: Props) => {
  const { userName } = props;

  const { stkPush, loading, error, toastMsg } = useContext(HabaContext);

  const { register, handleSubmit, errors } = useForm<FormData>();
  const [amount, setAmount] = useState(100);
  const [isPrivate, setIsPrivate] = useState(false);

  const onSubmit = (data: any): any => {
    const { amount, phoneNumber, myName, message } = data;

    const stkData = {
      phoneNumber,
      payToUserName: userName,
      amount,
      name: myName,
      message,
      isPrivate,
    };

    // Launch stk push
    stkPush(stkData);
  };

  const handleClick = (e: any, { value }: any): any => {
    setAmount(value);
  };

  const handleCheckChange = (e: any): any => {
    const target = e.target;
    const value = target.name === 'isPrivate' ? target.checked : target.value;
    setIsPrivate(value);
  };

  const optionalMessage = `Optional message to ${userName}`;

  if (error) {
    toast.error(error, {
      position: toast.POSITION.TOP_LEFT,
    });
  }

  if (toastMsg) {
    toast.success(toastMsg, {
      position: toast.POSITION.TOP_LEFT,
    });
  }

  return (
    <>
      <Segment raised>
        <Form onSubmit={handleSubmit(onSubmit)} loading={loading} className={styles.customForm}>
          <Form.Field>
            <label>Do a Haba</label>

            <Label
              circular
              basic
              size="big"
              value="100"
              onClick={handleClick}
              className={amount == 100 ? `${styles.active} ${styles.habaAmountLabel}` : `${styles.habaAmountLabel}`}
            >
              100
            </Label>
            <Label
              circular
              basic
              size="big"
              value="200"
              onClick={handleClick}
              className={amount == 200 ? `${styles.active} ${styles.habaAmountLabel}` : `${styles.habaAmountLabel}`}
            >
              200
            </Label>
            <Label
              circular
              basic
              size="big"
              value="500"
              onClick={handleClick}
              className={amount == 500 ? `${styles.active} ${styles.habaAmountLabel}` : `${styles.habaAmountLabel}`}
            >
              500
            </Label>
            <Label
              circular
              basic
              size="big"
              value="1000"
              onClick={handleClick}
              className={amount == 1000 ? `${styles.active} ${styles.habaAmountLabel}` : `${styles.habaAmountLabel}`}
            >
              1,000
            </Label>
            <Label
              circular
              basic
              size="big"
              value="5000"
              onClick={handleClick}
              className={amount == 5000 ? `${styles.active} ${styles.habaAmountLabel}` : `${styles.habaAmountLabel}`}
            >
              5,000
            </Label>
          </Form.Field>
          <Form.Field>
            <div style={{ display: 'flex', paddingBottom: '0.1em' }}>
              <label>
                Phone Number <span style={{ color: 'red' }}>*</span>
              </label>
              <Popup
                trigger={<Button basic icon="info" size="mini" style={{ marginLeft: 'auto' }} />}
                content="Phone number needed for MPesa payment"
                position="top right"
                basic
              />
            </div>
            <input
              type="number"
              name="phoneNumber"
              placeholder="254---------"
              ref={register({ required: true, pattern: /^254/i, minLength: 12, maxLength: 20 })}
            />
            {errors.phoneNumber && errors.phoneNumber.type === 'required' && <p>Phone Number is required</p>}
            {errors.phoneNumber && errors.phoneNumber.type === 'pattern' && <p>Phone Number must start with 254</p>}
            {errors.phoneNumber && errors.phoneNumber.type === 'minLength' && <p>Phone Number is too short</p>}
            {errors.phoneNumber && errors.phoneNumber.type === 'maxLength' && <p>Phone Number is long</p>}
            {/* Hidden input for paytousername */}

            <input type="hidden" name="payToUserName" value={userName} />
            <input type="hidden" name="amount" value={amount} ref={register({ required: true, min: 50, max: 10000 })} />
          </Form.Field>
          <Form.Field>
            <label>Your name</label>
            <input placeholder="(Optional)" name="myName" ref={register({ pattern: /^[\w-_.]*$/ })} />
            {errors.myName && errors.myName.type === 'pattern' && <p>No spaces allowed, invalid name</p>}
          </Form.Field>
          <Form.Field>
            <label> Message</label>
            <textarea
              placeholder={optionalMessage}
              name="message"
              ref={register({ minLength: 10, maxLength: 200 })}
            ></textarea>

            {errors.message && errors.message.type === 'minLength' && <p>Your message is short</p>}
            {errors.message && errors.message.type === 'maxLength' && <p>Your message is long</p>}
          </Form.Field>
          <Form.Field>
            <Checkbox
              label="Make it private?"
              type="checkbox"
              name="isPrivate"
              checked={isPrivate}
              onChange={handleCheckChange}
            />
          </Form.Field>
          <Button type="submit" className={`${styles.customSuccessButton} ${styles.customAuthBtn}`}>
            Haba
          </Button>
        </Form>
      </Segment>
    </>
  );
};

export default SingleHaba;
