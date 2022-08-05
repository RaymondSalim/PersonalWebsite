import React, { RefObject } from 'react';
import { Input, InputProps } from './Input';
import { GitHub } from '../icons/GitHub';
import { Email } from '../icons/Email';
import { Button } from '../buttons/Button';
import { LinkedIn } from '../icons/LinkedIn';

interface ContactState {}
interface ContactProps {}
interface Links {
  url: string,
  icon: React.ReactElement,
  name: string,
}

export class Contact extends React.Component<ContactProps, ContactState> {
  formRef: RefObject<HTMLFormElement>;
  inputFields: InputProps[] = [
    {
      type: 'text',
      name: 'name',
      id: 'form-name',
      label: 'Name',
      pattern: '.{2,}',
      required: true,
      className: 'bg-gray-lightest dark:bg-gray-darker row-start-1 row-end-2 col-start-1 col-end-3',
      placeholder: 'Your name',
    }, {
      type: 'email',
      name: 'email',
      id: 'form-email',
      label: 'Email',
      pattern: '[^@ \\t\\r\\n]+@[^@ \\t\\r\\n]+\\.[^@ \\t\\r\\n]+',
      required: true,
      className: 'bg-gray-lightest dark:bg-gray-darker row-start-1 row-end-2 col-start-3 col-end-5',
      placeholder: 'you@awesome.com',
    }, {
      type: 'text',
      name: 'subject',
      id: 'form-subject',
      label: 'Subject',
      pattern: '.{2,}',
      required: true,
      autoComplete: 'off',
      className: 'bg-gray-lightest dark:bg-gray-darker row-start-2 row-end-3 col-start-1 col-end-5',
      placeholder: 'I would like to chat with you!',
    }, {
      type: 'text',
      name: 'message',
      id: 'form-message',
      label: 'Message',
      pattern: '.{10,}',
      required: true,
      textArea: true,
      resizable: false,
      autoComplete: 'off',
      className: 'bg-gray-lightest dark:bg-gray-darker row-start-3 row-end-6 col-start-1 col-end-5',
      placeholder: 'I would like to talk to you about...',
    },
  ];

  constructor(props: ContactProps) {
    super(props);

    this.formRef = React.createRef();
  }

  sendMail = () => {
    if (this.formRef.current === null) return;

    const formData = new FormData(this.formRef.current);
    // eslint-disable-next-line no-useless-return
    if (!this.isFormValid(formData)) return;

    // TODO! Integrate emailjs
  };

  isFormValid = (form: FormData) : boolean => {
    // @ts-ignore
    // eslint-disable-next-line no-restricted-syntax
    for (const [key, value] of form) {
      const target = this.inputFields.find((el) => el.name === key);
      // eslint-disable-next-line no-continue
      if (target === undefined) continue;

      // eslint-disable-next-line no-continue
      if (target.pattern === undefined) continue;
      const regex = new RegExp(target.pattern);

      if (!regex.test(value)) {
        return false;
      }
    }
    return true;
  };

  render() {
    const links: Links[] = [
      {
        name: 'GitHub',
        url: 'https://github.com/RaymondSalim',
        icon: (
          <GitHub className={'inline-block transition-transform group-hover:scale-125 group-focus:scale-125'} />
        ),
      }, {
        name: 'LinkedIn',
        url: 'https://www.linkedin.com/in/raymondsalim/',
        icon: (
          <LinkedIn className={'inline-block transition-transform group-hover:scale-125 group-focus:scale-125'} />
        ),
      }, {
        name: 'Email',
        url: 'mailto:raymond@raymonds.dev',
        icon: (
          <Email className={'inline-block transition-transform group-hover:scale-125 group-focus:scale-125'} />
        ),
      },
    ];

    return (
      <div id="contact-grid" className={'flex flex-col gap-y-8 mt-16'}>
        <p>My inbox is always open to opportunities! If you have any questions, offers or just want to say hi, send a message and I&apos;ll get back to you!</p>
        <div className={'grid grid-cols-8 grid-rows-5 gap-x-2 gap-y-8'}>
          <div className="row-start-1 row-span-1 md:row-span-2 col-start-1 col-span-8 md:col-span-2 flex flex-col gap-y-2">
            {
              links.map((el) => (
                <div
                  key={el.name}
                >
                  <a
                    href={el.url}
                    className={'group focus:ring-0'}
                  >
                    {el.icon}
                    <span className={'ml-4 text-highlight group-hover:text-blue-sapphire group-focus:text-blue-sapphire'}>{el.name}</span>
                  </a>
                </div>
              ))
            }
          </div>
          <form
            ref={this.formRef}
            className={'row-start-2 md:row-start-1 row-span-full col-start-1 md:col-start-3 col-span-8 md:col-span-full grid grid-rows-5 grid-cols-4 gap-x-3 gap-y-2'}
          >
            {
              this.inputFields.map((el) => (
                <Input key={el.name} {...el} />
              ))
            }
            <Button
              text="Send Message!"
              className="px-8 py-4 mt-4 row-start-6 row-span-1 col-start-3 col-span-2 justify-self-end"
              onclick={this.sendMail}
            />
          </form>
        </div>
      </div>
    );
  }
}
