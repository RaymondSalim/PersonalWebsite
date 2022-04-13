import React from 'react';
import { getOuterHeight } from '../util/dimensions';

type Job = {
  name: string;
  position: string;
  url: string;
  monthYearStart: string;
  monthYearEnd: string;
  description: string[];
};

interface JobsState {
  activeTabID: number
  minPanelHeight: number
}

interface JobsProps {}

export class Jobs extends React.Component<JobsProps, JobsState> {
  btnRefs: React.RefObject<HTMLButtonElement>[] = [];
  panelRefs: React.RefObject<HTMLDivElement>[] = [];
  private ANIM_IN = 'job-desc-fade-in';
  private ANIM_OUT = 'job-desc-fade-out';

  constructor(props: JobsProps) {
    super(props);

    this.state = {
      activeTabID: 0,
      minPanelHeight: 0,
    };
  }

  componentDidMount() {
    const maxHeightPanel = this.panelRefs.reduce((prev: React.RefObject<HTMLDivElement>, curr: React.RefObject<HTMLDivElement>) => {
      const prevHeight = getOuterHeight(prev.current);
      const currHeight = getOuterHeight(curr.current);
      return (currHeight > prevHeight ? curr : prev);
    });

    if (this.state.minPanelHeight < getOuterHeight(maxHeightPanel.current)) {
      this.setState({
        minPanelHeight: getOuterHeight(maxHeightPanel.current),
      });
    }
  }

  setActiveTabID(i: number) {
    this.setState({
      activeTabID: i,
    });
  }

  // TODO! Find better way to animate panel change
  animationHandler(e: React.AnimationEvent<HTMLDivElement>) {
    const el = e.currentTarget;
    if (e.type === 'animationend' && e.animationName === 'job-desc-fade-out') {
      el.style.display = 'none';

      const targetPanel = this.panelRefs[this.state.activeTabID];
      if (targetPanel.current != null && targetPanel.current.style != null) {
        targetPanel.current.style.display = 'block';
        targetPanel.current.style.animation = `${this.ANIM_IN} 0.15s ease-in forwards`;
      }
    }
  }

  render() {
    let selector;
    const jobs: Job[] = [
      {
        name: 'Tokopedia',
        position: 'Software Engineer Intern',
        url: 'https://www.tokopedia.com/about/',
        monthYearStart: 'October 2021',
        monthYearEnd: 'March 2022',
        description: [
          'Implemented concurrency in golang, resulting in numerous serial tasks to be run in parallel',
          'Wrote unit tests, improving code coverage by ~15%',
          'Automated credit bureau data submission process, reducing time consumption by 150 times',
          'Created library that allows masking of strings, struct, etc. for privacy purposes',
          'Developed API Endpoints with CRUD functionality, including importing data from file',
        ],
      },
      {
        name: 'Mandiri',
        position: 'Software Engineer Intern',
        url: 'https://mandiri-investasi.co.id/en/',
        monthYearStart: 'May 2021',
        monthYearEnd: 'July 2021',
        description: [
          'Assisted in planning and development of website revamp, including customer journey analysis, UI and UX improvement',
          'Designed and developed a new microservice, which automates data filteration and calculation, hence reducing task execution time from one day to minutes',
          'Integrated third party API to deliver push notification based on user events',
        ],
      },
      {
        name: 'Kalbe Farma',
        position: 'IT Developer Intern',
        url: 'https://www.kalbe.co.id/',
        monthYearStart: 'October 2020',
        monthYearEnd: 'March 2021',
        description: [
          'Designed and developed a fully responsive web scraper web application with Python + PHP, increasing the efficiency of data collection process by 600%',
          'Implemented authentication system, background task scheduling and Content Management System',
          'Collaborated with the Business Development Department to plan and build a dynamic responsive landing page using jQuery and tailwindcss',
          'Developed a Content Management System, with role-based authentication using Bootstrap and jQuery',
          'Set up NGINX and MySQL, and deployed website on AWS S3',
          'Used Laravel framework, with tailwindcss and Alpine.js',
        ],
      },
    ];
    const tabs = jobs.map((job, index) => {
      this.btnRefs[index] = this.btnRefs[index] ?? React.createRef();
      return (
        <button
          onClick={() => this.setActiveTabID(index)}
          ref={ this.btnRefs[index] }
          key={index}
          data-key={index}
          id={`tab-${index}`}
          role='tab'
          tabIndex={this.state.activeTabID === index ? 0 : -1}
          aria-selected={this.state.activeTabID === index}
          aria-controls={`panel-${index}`}
          className={'w-full whitespace-nowrap text-left'}
        >{job.name}</button>
      );
    });
    if (this.btnRefs.length > 0 && this.btnRefs[0].current != null) {
      const btnHeight = this.btnRefs[0].current!!.offsetHeight;
      const selectorHeight = this.state.activeTabID * btnHeight + btnHeight * 0.5;

      selector = (
        <span
          className={'absolute leading-[0] !text-theme-primary-lighter transition-[top] hidden md:block'}
          style={{
            top: selectorHeight,
          }}
        >&gt;</span>
      );
    }
    const descriptions = jobs.map((job, index) => {
      this.panelRefs[index] = this.panelRefs[index] ?? React.createRef();
      return (
        <div
          key={index}
          ref={this.panelRefs[index]}
          id={`panel-${index}`}
          role={'tabpanel'}
          tabIndex={this.state.activeTabID === index ? 0 : -1}
          aria-labelledby={`tab-${index}`}
          aria-hidden={this.state.activeTabID !== index}
          style={{
            animation: `${this.state.activeTabID === index ? '' : `${this.ANIM_OUT} 0.15s ease-in forwards`}`,
          }}
          onAnimationEnd={(e) => this.animationHandler(e)}
          className={'relative inline-block'}
        >
          <h3 className={'no-pseudo mb-0'}>
            <span>{job.position}</span>
            <span
              className={'anchor-highlight text-theme-primary-light dark:text-theme-primary-lighter'}
            >
              &nbsp;@&nbsp;
              <a
                href={job.url} target="_blank" rel="noopener noreferrer">{job.name}
              </a>
            </span>
          </h3>
          <p className={'no-pseudo'}>{`${job.monthYearStart} - ${job.monthYearEnd}+`}</p>
          <ul className={'mt-4 list-disc list-outside ml-8'}>
              {
                job.description
                  .map((desc, descIndex) => (
                    <li key={descIndex} className={'pl-4'}>{desc}</li>
                  ))
              }
          </ul>
        </div>
      );
    });
    return (
      <div
        id={'experience-tab'}
      >
        <div
          role={'tablist'}
          aria-label={'Job tabs'}
          className={'flex md:flex-col items-start dark:text-white relative div-pseudo w-max mt-3'}
        >
          {tabs}
          {selector}
        </div>
        <div className={'w-full ml-8'} style={{ minHeight: this.state.minPanelHeight }}>
          {descriptions}
        </div>
      </div>
    );
  }
}
