import * as React from 'react';
import axios, { AxiosError, AxiosRequestConfig } from 'axios';

import styles from './styles.module.scss';
import Button from '../button';
import { isValidEmail } from '../../utils/form-validators';

interface IProps {
  post: {
    title: string;
    url: string;
  };
}

const Subscribe: React.FC<IProps> = ({ post: { title, url } }) => {
  const [email, setEmail] = React.useState('');
  const [error, setError] = React.useState('');
  const [success, setSuccess] = React.useState(false);
  const [submitting, setSubmitting] = React.useState(false);

  const handleChange = (event: React.FormEvent<HTMLInputElement>): void => {
    if (error) {
      setError('');
    }

    setEmail((event.target as HTMLInputElement).value);
  };

  const sendFormRequest = (geoData: any): void => {
    if (!geoData) {
      geoData = { error: 'Not available due to ipinfo error' };
    }

    const date = new Date();
    const utcNow = Date.UTC(
      date.getUTCFullYear(),
      date.getUTCMonth(),
      date.getUTCDate(),
      date.getUTCHours(),
      date.getUTCMinutes(),
      date.getUTCSeconds(),
    );

    const requestUrl = 'https://formspree.io/moqvkojy';
    const options: AxiosRequestConfig = {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      data: {
        email,
        utcDatetime: new Date(utcNow),
        geoData,
        article: {
          url,
          title,
        },
      },
      url: requestUrl,
    };
    axios(options)
      .then(() => {
        setSuccess(true);
        setSubmitting(false);
      })
      .catch(function(error: AxiosError) {
        if (error.response) {
          // The request was made and the server responded with a status code
          // that falls out of the range of 2xx
          console.log(error.response.data);
          console.log(error.response.status);
          console.log(error.response.headers);
        } else if (error.request) {
          // The request was made but no response was received
          // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
          // http.ClientRequest in node.js
          console.log(error.request);
        } else {
          // Something happened in setting up the request that triggered an Error
          console.log('Error', error.message);
        }
        console.log(error.config);

        setError(error.message);
        setSubmitting(false);
      });
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>): void => {
    event.preventDefault();
    if (submitting) {
      return;
    }

    setSubmitting(true);
    if (!email) {
      setSubmitting(false);
      return setError('Email field is mandatory.');
    }

    if (!isValidEmail(email)) {
      setSubmitting(false);
      return setError('Email is not valid.');
    }

    axios({
      method: 'GET',
      headers: { Authorization: `Bearer 546becbfd0c8aa` },
      url: 'https://ipinfo.io/json',
    })
      .then(response => {
        sendFormRequest(response.data);
      })
      .catch(error => {
        console.error(error);
        sendFormRequest('GeoData unavailable');
      });
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit} noValidate>
      <h2>Get notified about new articles without spam!</h2>
      {success ? (
        <p className={styles.success}>Thank you for subscribing! You will receive an email when I post again.</p>
      ) : (
        <>
          <input
            className={styles.input}
            type="email"
            placeholder="john.doe@gmail.com"
            name="email"
            onChange={handleChange}
            value={email}
          />
          <Button type="submit" color="--color-primary" opaque className={styles.button} disabled={submitting}>
            {submitting ? 'Sending...' : 'Subscribe'}
          </Button>
        </>
      )}
      <p style={{ opacity: error ? '1' : '0' }} className={styles.error}>
        {error}
      </p>
    </form>
  );
};

export default Subscribe;
