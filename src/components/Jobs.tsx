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
        monthYearStart: 'test 2022',
        monthYearEnd: 'test2 2021',
        description: [
          'test description tkp 1',
          'test description tkp 2',
          'test description tkp 3',
          'test description tkp 4',
          'test description tkp 5',
          'test description tkp 6',
        ],
      },
      {
        name: 'Mandiri',
        position: 'Software Engineer Intern',
        url: 'https://mandiri-investasi.co.id/en/',
        monthYearStart: 'test 2021',
        monthYearEnd: 'test2 2020',
        description: [
          'test description mmi 1',
          'test description mmi 2',
          'test description mmi 3',
        ],
      },
      {
        name: 'Kalbe Farma',
        position: 'IT Developer Intern',
        url: 'https://www.kalbe.co.id/',
        monthYearStart: 'test 2020',
        monthYearEnd: 'test2 2019',
        description: [
          'test description kf 1',
          'test description kf 2',
          'test description kf 3',
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
          <div className={'mt-4'}>
            {
              job.description
                .map((desc, descIndex) => (
                      <li key={descIndex}>{desc}</li>
                ))
            }
          </div>
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
