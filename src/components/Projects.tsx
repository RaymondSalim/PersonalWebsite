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
  render() {
    const projects: Project[] = [
      {
        name: 'Reddit Downloader',
        repoUrl: 'https://github.com/RaymondSalim/RedditDownloader-Kotlin',
        projUrl: '',
        imgUrl: 'https://picsum.photos/1920',
        imgAlt: 'Reddit Downloader',
        techStacks: [
          'Kotlin',
        ],
        description: 'An android app to easily download media files from reddit. Stores post information, supports background download. Utilizes tools & libraries such as WorkManager, RoomDB, Coroutines, etc.',
        date: new Date(2021, 3),
      },
      {
        name: 'E-commerce Web Scraper',
        repoUrl: 'https://github.com/RaymondSalim/FinalWebScrape',
        projUrl: '',
        imgUrl: 'https://picsum.photos/1920',
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
        imgUrl: 'https://picsum.photos/1920',
        imgAlt: 'Tracker',
        techStacks: [
          'Kotlin',
        ],
        description: "Android app that logs and tracks user's location, call history, messages. Data is viewable from a different app. Uses Firebase for database and authenticcation. ",
        date: new Date(2020, 10),
      },
    ];
    // TODO! Add overlap between descriptions and image
    // TODO! Fix description color bg
    return (
      <div id="project-grid" className={'flex flex-col gap-y-48'}>
        {
          projects.map((proj, index) => {
            const descriptionContent = {
              __html: proj.description,
            };

            return (<div key={proj.name} id={`project-${index}`} className={'group flex w-full odd:flex-row even:flex-row-reverse justify-between'}>
              <img src={proj.imgUrl} alt={proj.imgAlt} style={{
                aspectRatio: '16/9',
                maxWidth: '30vw',
              }}/>
              <div id="project-desc-container" className={'flex flex-col justify-center gap-y-3 group-odd:text-right group-even:text-left child-no-pseudo'}>
                <h3 className={'text-theme-primary-light dark:text-theme-primary-lighter'}>{proj.name}</h3>
                <div className={'bg-gray-600 rounded-md p-6'}>
                  <p className={'mb-4'} dangerouslySetInnerHTML={descriptionContent} />
                </div>
                <ul className={'list-none'}>
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
                      ? <a href={proj.repoUrl} className={'inline-block hover:scale-125 text-white hover:text-theme-primary-light dark:hover:text-theme-primary-lighter transition-transform group-odd:first:ml-0 group-odd:last:mr-0 group-even:first:mr-0 group-even:last:ml-0 mx-2'}>
                        <GitHub />
                      </a>
                      : null
                  }
                  {
                    proj.projUrl.length > 0
                      ? <a href={proj.projUrl} className={'inline-block hover:scale-125 text-white hover:text-theme-primary-light dark:hover:text-theme-primary-lighter transition-transform group-odd:first:ml-0 group-odd:last:mr-0 group-even:first:mr-0 group-even:last:ml-0 mx-2'}>
                        <External />
                      </a>
                      : null
                  }
                </div>
              </div>
            </div>);
          })
        }
      </div>
    );
  }
}
