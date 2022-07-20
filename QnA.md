# QnA

### Planning

> What do you think are the greatest areas of risk in completing the project?

- I could see the inital view, where the user is supposed to enter a repo name, could be at risk because it requires routing logic to do it nicely.

- Accessibility may not be 100%.

> What changes/additions would you make to the design?

- Add loading state designs.

- Add unhappy path designs.

- Pagination or infinite scroll.

> List a two or three features that you would consider implementing in the future that would add significant value to the project.

- Autocomplete in the search box.

- Filtering by tags.

- Fuzzy search for issues.

- Sort issues by comment engagement and recently updated.

---

### Looking Back

> Describe the major design/build decisions and why you made them.

- This is a single-page app without much routing built in yet. I made this decision to limit complexity. I used React and Styled Components to build the UI and used React context and hooks.

> How long did the assignment take (in hours)? Please break down your answer into buckets (e.g. "Learning Framework", "Coding", "Debugging").

- I worked on the project for about four hours of active time. I spent the first hour learning the APIs and organizing my project. My the first half, I had a search form that could fetch issues and display them. I spent some time working on writing tests for different search input cases. I then spent the remainder of the time on design inprovements and the filters.  

> If you could go back and give yourself advice at the beginning of the project, what would it be?

- I initially didn't write the fetching logic as a hook, but now that I know how coupled it is with loading and error state, I would write it as a hook to begin with so it can be reused across the two views and the views don't have to independently handle error and loading state updates.

> Did you learn anything new?

- I learned more about using flexbox for grid layouts. I also got more familar with React's useReducer.

> Do you feel that this assignment allowed you to showcase your abilities effectively?

- I can see how this exercise would be difficult for me earlier in my career, so I think it is demonstrative of my skills.

> Are there any significant web development-related skills that you possess that were not demonstrated in this exercise? If so, what are they?

- The communication layer wasn't explored much with this project as well as things like performance, monitoring, and analaytics. 
