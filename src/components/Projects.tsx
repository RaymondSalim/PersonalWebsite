import React from 'react';
import { GitHub } from '../icons/GitHub';
import { External } from '../icons/External';

type Project = {
  name: string,
  description: string,
  techStacks: string[],
  repoUrl: string,
  projUrl: string,
  imgUrl: string,
  imgAlt: string,
  date: Date,
};

interface ProjectsState {}

interface ProjectsProps {}

export class Projects extends React.Component<ProjectsProps, ProjectsState> {
  private imageRefs: React.RefObject<HTMLDivElement>[];

  constructor(props: ProjectsProps) {
    super(props);

    this.imageRefs = [];
  }

  handleScroll() {
    if (window.innerWidth <= 768) {
      return;
    }

    this.imageRefs.forEach((refObj) => {
      if (refObj.current === null) {
        return;
      }

      const el = refObj.current;
      const imageEl: HTMLElement | null = el.querySelector('.project-image-container');
      const descEl: HTMLElement | null = el.querySelector('.project-desc-container');

      if (imageEl === null || descEl === null) {
        return;
      }

      if (
        imageEl.getBoundingClientRect().top > window.innerHeight * 1.2
        || imageEl.getBoundingClientRect().bottom < window.innerHeight * -0.2
      ) {
        descEl.style.transform = '';
      }

      const target = window.innerHeight * 0.5;
      const diff = imageEl.getBoundingClientRect().top + (imageEl.offsetHeight / 2) - target;
      const diffPercentage = (0.35 * diff) / target;

      descEl.style.transform = `translateY(${imageEl.offsetHeight * diffPercentage}px)`;
    });
  }

  componentDidMount() {
    window.addEventListener('scroll', this.handleScroll.bind(this));
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleScroll.bind(this));
  }

  render() {
    const projects: Project[] = [
      {
        name: 'Reddit Downloader',
        repoUrl: 'https://github.com/RaymondSalim/RedditDownloader-Kotlin',
        projUrl: '',
        imgUrl: 'https://raw.githubusercontent.com/RaymondSalim/CDN_Assets/main/Personal%20Website/Reddit%20Downloader.png',
        imgAlt: 'Reddit Downloader',
        techStacks: [
          'Kotlin',
        ],
        description: 'Easily download media files from reddit. Stores post information, supports background download. Utilizes tools & libraries such as WorkManager, RoomDB, Coroutines, etc.',
        date: new Date(2021, 3),
      },
      {
        name: 'E-commerce Web Scraper',
        repoUrl: 'https://github.com/RaymondSalim/FinalWebScrape',
        projUrl: '',
        imgUrl: 'https://raw.githubusercontent.com/RaymondSalim/CDN_Assets/main/Personal%20Website/WebScrape.jpeg',
        imgAlt: 'Web Scraper',
        techStacks: [
          'Python',
          'PHP',
        ],
        description: 'Web scraping tool that gathers product information (price, name, seller, etc.) from various e-commerce sites in Indonesia. Supports concurrent scraping, and task management. Written in Python with the Selenium library, and PHP with Laravel as the frontend',
        date: new Date(2021, 1),
      },
      {
        name: 'Tracker',
        repoUrl: 'https://github.com/RaymondSalim/Tracker',
        projUrl: '',
        imgUrl: 'https://raw.githubusercontent.com/RaymondSalim/CDN_Assets/main/Personal%20Website/Tracker.png',
        imgAlt: 'Tracker',
        techStacks: [
          'Kotlin',
        ],
        description: "Logs and track user's location, call history, messages. Data is viewable from a seperate app. Uses Firebase for database and authentication. ",
        date: new Date(2020, 10),
      },
    ];
    // TODO! Find better color for light scheme? (replace bg-theme-secondary-dark)
    return (
      <div id="project-grid" className={'flex flex-col gap-y-24 md:gap-y-36'}>
        {
          projects.map((proj, index) => {
            const descriptionContent = {
              __html: proj.description,
            };
            let ref = this.imageRefs[index];
            if (ref === undefined) {
              this.imageRefs[index] = React.createRef();
              ref = this.imageRefs[index];
            }

            return (
              <div
                key={proj.name}
                id={`project-${index}`}
                className={'group w-full grid grid-cols-12 items-center'}
                ref={ref}
              >
                <div
                  data-image-id={index}
                  className={'project-image-container relative bp-max-768:h-full bg-theme-primary-light hover:bg-transparent transition-colors col-start-1 col-end-13 md:group-odd:col-start-1 md:group-odd:col-end-8 md:group-even:col-start-6 md:group-even:col-end-13 row-start-1 row-end-2 md:after:absolute md:after:w-full md:after:h-full md:after:content-[""] md:after:border md:after:border-gray-600 dark:md:after:border-white md:after:top-0 md:after:left-0 z-0 md:group-odd:md:after:translate-x-4 md:group-even:md:after:-translate-x-4 md:after:translate-y-4 hover:md:group-odd:md:after:translate-x-0 hover:md:group-even:md:after:translate-x-0 hover:md:after:translate-y-0 md:after:transition-all md:after:-z-20 drop-shadow-2xl'}
                >
                  <img
                    src={proj.imgUrl}
                    alt={proj.imgAlt}
                    style={{
                      aspectRatio: '16/9',
                      // maxWidth: '25vw',
                    }}
                    className={'md:mix-blend-multiply bp-max-768:h-full bp-max-768:object-cover'}
                  />
                </div>
                <div
                  data-description-id={index}
                  className={'project-desc-container bp-max-768:bg-theme-secondary-dark bp-max-768:bg-opacity-90 bp-max-768:p-10 col-start-1 col-end-13 md:group-odd:col-start-7 md:group-odd:col-end-13 md:group-even:col-start-1 md:group-even:col-end-7 row-start-1 row-end-2 md:group-odd:text-right md:group-even:text-left child-no-pseudo z-20'}
                >
                  <h3 className={'text-theme-primary-light dark:text-theme-primary-lighter my-4'}>{proj.name}</h3>
                  <div className={'md:bg-theme-secondary-dark rounded-md p-6 bp-max-768:px-0 my-4 drop-shadow-2xl'}>
                    <p className={'mb-4 text-white'} dangerouslySetInnerHTML={descriptionContent} />
                  </div>
                  <ul className={'list-none my-4'}>
                    {proj.techStacks.map((el, ind) => (
                      <li
                        key={ind}
                        className={'inline-block first-of-type:ml-0 last-of-type:mr-0 mx-4'}
                      >{el}</li>
                    ))}
                  </ul>
                  <div>
                    {
                      proj.repoUrl.length > 0
                        ? <a href={proj.repoUrl} className={'inline-block hover:scale-125 hover:text-theme-primary-light dark:hover:text-theme-primary-lighter transition-transform group-odd:first:ml-0 group-odd:last:mr-0 group-even:first:mr-0 group-even:last:ml-0 mx-2'}>
                          <GitHub />
                        </a>
                        : null
                    }
                    {
                      proj.projUrl.length > 0
                        ? <a href={proj.projUrl} className={'inline-block hover:scale-125 hover:text-theme-primary-light dark:hover:text-theme-primary-lighter transition-transform group-odd:first:ml-0 group-odd:last:mr-0 group-even:first:mr-0 group-even:last:ml-0 mx-2'}>
                          <External />
                        </a>
                        : null
                    }
                  </div>
                </div>
              </div>
            );
          })
        }
      </div>
    );
  }
}
