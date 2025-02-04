function BlogArticle() {
  return (
    <div className="blog-article p-10 md:p-20">
      <div className="max-w-[600px] 2xl:max-w-[800px] mx-auto mt-[22.5px]">
        <p>If you work regularly with React, chances are you are already familiar with at least the concept of <a href="https://reactjs.org/docs/react-api.html#reactsuspense" className="external-link" rel="nofollow"><u>React Suspense</u></a>.
          Suspense is a useful tool provided by
          the React library that allows
          developers more control over UI loading states.
          If, however, you work all day with legacy code
          , refuse to let your React version budge past
          16.5, or are simply new to React, allow us to
          give you an introduction!&nbsp;</p>
        <h2 id="HowtoOptimizeYourUIwithReactSuspense-WhatisSuspense?">What is Suspense?</h2>
        <p>React Suspense is <strong>not </strong>React’s foray into the film industry—Suspense is a tool provided by the React library beginning with React 16.6. Suspense essentially extends React’s <em>reactive</em> capabilities into the asynchronous world, allowing the developer the ability to implement a more declarative loading state for their UI. What does that mean? Well, let’s dive into the code snippets.</p>
        <h2 id="HowtoOptimizeYourUIwithReactSuspense-SuspenseandCode-Splitting(React16.6)">Suspense and Code-Splitting (React 16.6)</h2>
        <p>When React Suspense first released as an experimental feature in React 16.6, its only supported use was for code-splitting with <code>React.lazy</code>. Take the following, for example:</p>
        <pre className="code-block">
          <code className="language-javascript">
            {`
              import Dashboard from '../pages/Dashboard';
              import Employees from '../pages/Employees';
              import ProjectRoutes from '../pages/Projects/Routes';
              import Layout from '../pages/Layout';

              export default function App() {
                return (
                  <Layout>
                    <Switch>
                      <Route path="/" exact>
                        <Dashboard />
                      </Route>
                      <Route path="/team-members">
                        <Employees />
                      </Route>
                      <Route path="/projects">
                        <ProjectRoutes />
                      </Route>
                    </Switch>
                  </Layout>
                );
              }
            `}
          </code>
        </pre>
        <p>Let’s say each of these children are large components with deeply nested trees. Historically, mounting these components would take time and slow down your initial load time. This provides a poor UX. We would rather the user be able to see the page as soon as possible. If you update this implementation by wrapping the children of <code>&lt;Layout /&gt;</code> in a <code>&lt;Suspense /&gt;</code> boundary, the user sees the rendered output of the <code>&lt;Spinner /&gt;</code> component and whatever view is presented within <code>&lt;Layout&gt;</code> until the bundles of the components are loaded and rendered.</p>
        <pre className="code-block">
          <code className="language-javascript">
            {`
              import { lazy } from 'react'

              const Employees = lazy(() => import("../pages/Employees"));
              const Dashboard = lazy(() => import("../pages/Dashboard"));
              const ProjectRoutes = lazy(() => import("../pages/Projects/Routes"));

              export default function App(): JSX.Element {  
                return (    
                  <Layout>      
                    <Suspense fallback={<Spinner />}>        
                      <Switch>          
                        <Route path="/" exact>            
                          <Dashboard />          
                        </Route>          
                        <Route path="/team-members">            
                          <Employees />          
                        </Route>          
                        <Route path="/projects">            
                          <ProjectRoutes />          
                        </Route>       
                      </Switch>      
                   </Suspense>    
                 </Layout>  
                );
              }
            `}
          </code>
        </pre>
        <p>Notice the updated implementation for the imports of our components as well. {`We're`} leveraging <code>React.lazy</code> to render a dynamic <code>import()</code> as a regular component, automatically loading the bundles for these separate components when <code>App</code> first renders.</p>
        <p>React expects these imports to return a Promise that resolves to a module containing a component as its default export. Under the hood, React knows to treat this Promise as the cue for Suspense to fire and render the fallback component. Depending on the size of your application, such a pattern could be a great way to speed up the load times.</p>
        <h2 id="HowtoOptimizeYourUIwithReactSuspense-SuspenseandData-Fetching">Suspense and Data-Fetching</h2>
        <p>This is all well and good, but the real asynchronous bread-and-butter are our API calls, right? The React team remains <a href="https://reactjs.org/blog/2022/03/29/react-v18.html#:~:text=Ad%20hoc%20data%20fetching%20with%20Suspense%20is%20technically%20possible%2C%20but%20still%20not%20recommended%20as%20a%20general%20strategy." className="external-link" rel="nofollow"><u>hesitant</u></a> to encourage idiosyncratic implementations of Suspense with data fetching. Why is this? Well, below is a code snippet for a resource, something React uses under the hood to trigger its Suspense boundaries.</p>
        <pre className="code-block">
          <code className="language-javascript">
            {`
              function wrapPromise(promise) {
                let status = "pending";
                let result;
                let suspender = promise.then(
                  (r) => {
                    status = "success";
                    result = r;
                  },
                  (e) => {
                    status = "error";
                    result = e;
                  }
                );
        
                return {
                  read() {
                    if (status === "pending") {
                      throw suspender;
                    } else if (status === "error") {
                      throw result;
                    } else if (status === "success") {
                      return result;
                    }
                  }
                };
              }
            `}
          </code>
        </pre>
        <p>This wrapper takes a Promise and returns an object with a <code>read()</code> method, and that is the basic shape of a resource. This <code>read()</code> method will either return the result, throw the error, or throw the Promise. {`It's`} that latter possibility that is essential: whenever we throw a Promise, the most recent parent Suspense boundary will catch it and return the fallback.</p>
        <p>Looking at the above implementation, we see two callback functions passed to the <code>.then()</code> chained to our Promise argument. The former fires on success and the latter fires on error, and until either of those callbacks fire, our status is pending, and so our function throws its Promise. This implementation then executed within a component may look like this:</p>
        <pre className="code-block">
          <code className="language-javascript">
            {`
              import { wrapPromise } from './utils';
        
              function fetchUser() {
                return new Promise((resolve) => {
                  setTimeout(() => {
                    resolve({
                      name: "John Doe"
                    });
                  }, 1000);
                });
              }
        
              function fetchProfileData() {
                let userPromise = fetchUser();
                return {
                  user: wrapPromise(userPromise),
                };
              }
        
              // need to call this outside of your render function
              const resource = fetchProfileData();
        
              function ProfileDetails = () => {
                // Try to read user info, although it might not have loaded yet
                const user = resource.user.read();
                return <h1>{user.name}</h1>;
              }
            `}
          </code>
        </pre>
        <p>To note, we use <code>fetchUser</code> to simulate our server request and then wrap that <em>Promisified</em> return in <code>wrapPromise</code> to give it the Suspense resource shape. React knows under the hood to call this <code>read()</code> method to determine when to trigger a component rerender. If we call this component wrapped in Suspense within a parent component, React will render the <code>&lt;Spinner /&gt;</code> component until the <code>read()</code> method no longer throws a Promise!</p>
        <pre className="code-block">
          <code className="language-javascript">
            {`
              function ProfilePage = () => {
                return (
                  <ErrorBoundary>
                    <Suspense fallback={<Spinner />}>
                      <ProfileDetails />
                    </Suspense>
                  </ErrorBoundary>
                );
              }
            `}
          </code>
        </pre>
        <p>Once the return of <code>read()</code> changes, this will trigger a re-render, and React will render with the result of user within <code>&lt;ProfileDetails /&gt;</code>. If, however, the result of <code>read()</code> is a thrown error, {`that's`} a great opportunity to implement an <a href="https://reactjs.org/docs/error-boundaries.html" className="external-link" rel="nofollow"><u>&lt;ErrorBoundary&gt;</u></a> to catch it within your UI!&nbsp;</p>
        <p>As of version 18, React only <a href="https://reactjs.org/docs/react-api.html#reactsuspense:~:text=Today%2C%20lazy%20loading%20components%20is%20the%20only%20use%20case%20supported%20by%20%3CReact.Suspense%3E%3A" className="external-link" rel="nofollow"><u>officially supports</u></a> the implementation of Suspense with code-splitting through <code>React.lazy</code>. For this reason, {`it's`} encouraged for users not to implement their own custom data fetching patterns that leverage React Suspense, as its implementation may change in the future.</p>
        <p>Alternatively, users can work with existing libraries that integrate React Suspense under the hood, and should the Suspense implementation details change in the future this <em>may</em> have a more minimal impact on the user’s own codebase.</p>
        <p>Data fetching libraries that optionally integrate with Suspense include <a href="https://swr.vercel.app/docs/suspense" className="external-link" rel="nofollow"><u>SWR</u></a>, <a href="https://tanstack.com/query/v4/docs/guides/suspense" className="external-link" rel="nofollow"><u>React Query</u></a>, and <a href="https://relay.dev/blog/2021/03/09/introducing-relay-hooks/#hooks-and-suspense-for-data-fetching" className="external-link" rel="nofollow"><u>Relay</u></a>. Note that the Suspense section in each library urges caution around implementing Suspense with data fetching in production. Use at your own caution!&nbsp;</p>
        <h2 id="HowtoOptimizeYourUIwithReactSuspense-SuspensewithReact18">Suspense with React 18</h2>
        <p>With React 18, Suspense saw its use cases expanded. As I said before, ad hoc data fetching with Suspense or integrated 3rd party libraries in production is still a caution, but this doesn’t stop Suspense from finessing its DOM handling as well as finding new value in server side rendering (SSR). Take the following example:</p>
        <pre className="code-block">
          <code className="language-javascript">
            {`
              <div>
                <Suspense fallback={<Spinner />}>
                  <Panel>
                    <Comments /> // ← This throws a promise while fetching
                  </Panel>
                </Suspense>
              </div>
            `}
          </code>
        </pre>
        <p>&nbsp;</p>
        <p>In earlier versions of Suspense, React would have crawled the tree, rendering <code>&lt;Panel&gt;</code> and then began to render <code>&lt;Comments&gt;</code>, seen that <code>&lt;Comments&gt;</code> initiated a fetch and threw a Promise to engage Suspense, and so placed a hole within <code>&lt;Panel&gt;</code> where <code>&lt;Comments /&gt;</code> would be.</p>
        <p>Thereafter, <code>&lt;Panel&gt;</code> would be hidden from view with a display: none styling, and its <code>useEffect</code> would fire because it had technically mounted. Once the data had been fetched, any fallback UI provided by Suspense would be removed from the DOM, <code>&lt;Comments /&gt;</code> would be placed within <code>&lt;Panel&gt;</code> and the <code>display: none</code> style would be removed from <code>&lt;Panel&gt;</code>.</p>
        <p>In React 18, Suspense simplifies this process. Rather than putting the <code>&lt;Panel&gt;</code> content into the DOM, we throw it and everything between the nearest parent <code>&lt;Suspense&gt;</code> away. Once <code>&lt;Comments /&gt;</code> is ready, everything will be rendered. Incomplete trees are no longer committed. React waits for the whole subtree to be ready and then commits it at once. This has the added benefit of not triggering any <code>useEffects</code> within <code>&lt;Panel&gt;</code> while <code>&lt;Comments /&gt;</code> suspends.</p>
        <p>Furthermore, engaging Suspense in React 18 serves as an “opt-in” for two exciting SSR features: HTML Streaming and Selective Hydration. Take a look at the following images:</p>
        <img
          src="https://www.bitovi.com/hs-fs/hubfs/suspense-1.png?width=694&name=suspense-1.png"
          alt="suspense-1"
          width="694"
          style={{ width: 694, margin: 'auto', display: 'block' }}
          srcSet="https://www.bitovi.com/hs-fs/hubfs/suspense-1.png?width=347&name=suspense-1.png 347w, https://www.bitovi.com/hs-fs/hubfs/suspense-1.png?width=694&name=suspense-1.png 694w, https://www.bitovi.com/hs-fs/hubfs/suspense-1.png?width=1041&name=suspense-1.png 1041w, https://www.bitovi.com/hs-fs/hubfs/suspense-1.png?width=1388&name=suspense-1.png 1388w, https://www.bitovi.com/hs-fs/hubfs/suspense-1.png?width=1735&name=suspense-1.png 1735w, https://www.bitovi.com/hs-fs/hubfs/suspense-1.png?width=2082&name=suspense-1.png 2082w"
          sizes="(max-width: 694px) 100vw, 694px"
        />
        <img
          src="https://www.bitovi.com/hs-fs/hubfs/suspense-2.png?width=694&name=suspense-2.png"
          alt="suspense-2"
          width="694"
          style={{ width: 694, margin: 'auto', display: 'block' }}
          srcSet="https://www.bitovi.com/hs-fs/hubfs/suspense-2.png?width=347&name=suspense-2.png 347w, https://www.bitovi.com/hs-fs/hubfs/suspense-2.png?width=694&name=suspense-2.png 694w, https://www.bitovi.com/hs-fs/hubfs/suspense-2.png?width=1041&name=suspense-2.png 1041w, https://www.bitovi.com/hs-fs/hubfs/suspense-2.png?width=1388&name=suspense-2.png 1388w, https://www.bitovi.com/hs-fs/hubfs/suspense-2.png?width=1735&name=suspense-2.png 1735w, https://www.bitovi.com/hs-fs/hubfs/suspense-2.png?width=2082&name=suspense-2.png 2082w"
          sizes="(max-width: 694px) 100vw, 694px"
        />
        <p>Imagine the box in the lower right was wrapped in a Suspense. With SSR and Suspense, the remainder of the HTML content for the page can <em>stream</em> in while the fallback Suspense UI renders in place of that particularly slow component. Once the content has loaded, it can be dynamically added into the HTML via a discrete <code>&lt;script&gt;</code> tag in place of the fallback Suspense, meaning that our HTML streaming does not need to be a top-down process. You no longer need to wait for all data to load on the server before sending it. As long as you have enough content to show a skeleton of your application, the remaining HTML can be piped in as it is read!&nbsp;</p>
        <p>Moreover, with SSR, the HTML content will load from your server for the page before the JavaScript code. This means the page, or portions of the page, may be visible but not interactive. These non-interactive portions are “dry”, meaning they lack the logic to make them work, so they need to be “hydrated.”</p>
        <p>Whenever we wrap a component in Suspense, React can carry on streaming in available HTML and hydrating, all while the suspended components wait to be ready. In the below images, the green shapes are hydrated HTML. You can see how the streamed-in HTML hydrates while another component suspends. Once that component’s HTML loads, it streams in and is ready to hydrate as well!</p>
        <p>
          <img
            src="https://www.bitovi.com/hs-fs/hubfs/suspense-3.png?width=694&amp;name=suspense-3.png"
            alt="suspense-3"
            width={694}
            style={{
              width: 694,
              marginLeft: 'auto',
              marginRight: 'auto',
              display: 'block',
            }}
            srcSet={[
              'https://www.bitovi.com/hs-fs/hubfs/suspense-3.png?width=347&amp;name=suspense-3.png 347w',
              'https://www.bitovi.com/hs-fs/hubfs/suspense-3.png?width=694&amp;name=suspense-3.png 694w',
              'https://www.bitovi.com/hs-fs/hubfs/suspense-3.png?width=1041&amp;name=suspense-3.png 1041w',
              'https://www.bitovi.com/hs-fs/hubfs/suspense-3.png?width=1388&amp;name=suspense-3.png 1388w',
              'https://www.bitovi.com/hs-fs/hubfs/suspense-3.png?width=1735&amp;name=suspense-3.png 1735w',
              'https://www.bitovi.com/hs-fs/hubfs/suspense-3.png?width=2082&amp;name=suspense-3.png 2082w',
            ]}
            sizes="(max-width: 694px) 100vw, 694px"
          />
          <img
            src="https://www.bitovi.com/hs-fs/hubfs/suspense-4-1.png?width=694&amp;name=suspense-4-1.png"
            alt="suspense-4-1"
            width={694}
            style={{
              width: 694,
              marginLeft: 'auto',
              marginRight: 'auto',
              display: 'block',
            }}
            srcSet={[
              'https://www.bitovi.com/hs-fs/hubfs/suspense-4-1.png?width=347&amp;name=suspense-4-1.png 347w',
              'https://www.bitovi.com/hs-fs/hubfs/suspense-4-1.png?width=694&amp;name=suspense-4-1.png 694w',
              'https://www.bitovi.com/hs-fs/hubfs/suspense-4-1.png?width=1041&amp;name=suspense-4-1.png 1041w',
              'https://www.bitovi.com/hs-fs/hubfs/suspense-4-1.png?width=1388&amp;name=suspense-4-1.png 1388w',
              'https://www.bitovi.com/hs-fs/hubfs/suspense-4-1.png?width=1735&amp;name=suspense-4-1.png 1735w',
              'https://www.bitovi.com/hs-fs/hubfs/suspense-4-1.png?width=2082&amp;name=suspense-4-1.png 2082w',
            ]}
            sizes="(max-width: 694px) 100vw, 694px"
          />
        </p>
        <p>The magic doesn’t stop there! Imagine a scenario in which the HTML for two components loads. Let’s say the sidebar (pictured as “hydrating” in the image below) is hydrating first as it is higher up in the tree, but the user clicks elsewhere on a still non-interactive portion of the page. React will actually be able to synchronously hydrate this dry portion of the page during the capture phase of that click event, and as a result, the dry section will be hydrated in time to respond to the user interaction!</p>
        <p>Thereafter, React will continue hydrating the sidebar. Selective Hydration allows React to prioritize hydrating the most important parts of the page as per user interaction. In combination with HTML Streaming, Selective Hydration means the page <em>feels</em> interactive as fast as possible.</p>
        <img src="https://www.bitovi.com/hs-fs/hubfs/suspense-5.png?width=694&amp;name=suspense-5.png" alt="suspense-5" width="694" style={{ width: '694px' }} srcSet="https://www.bitovi.com/hs-fs/hubfs/suspense-5.png?width=347&amp;name=suspense-5.png 347w, https://www.bitovi.com/hs-fs/hubfs/suspense-5.png?width=694&amp;name=suspense-5.png 694w, https://www.bitovi.com/hs-fs/hubfs/suspense-5.png?width=1041&amp;name=suspense-5.png 1041w, https://www.bitovi.com/hs-fs/hubfs/suspense-5.png?width=1388&amp;name=suspense-5.png 1388w, https://www.bitovi.com/hs-fs/hubfs/suspense-5.png?width=1735&amp;name=suspense-5.png 1735w, https://www.bitovi.com/hs-fs/hubfs/suspense-5.png?width=2082&amp;name=suspense-5.png 2082w" sizes="(max-width: 694px) 100vw, 694px" />
        <h2 id="HowtoOptimizeYourUIwithReactSuspense-BenefitsofIncorporatingSuspense">Benefits of Incorporating Suspense</h2>
        <p>React Suspense offers developers the ability to more declaratively handle their UI loading states. Gone are the days of <code>if (loading) return &lt;Loading /&gt;</code> or <code>if (error) return &lt;Error /&gt;</code> within components. We can leverage Suspense (and Error Boundary, as well) to reduce boilerplate code in our UI, streamline the data fetching process, and granularly batch view states together.</p>
        <pre className="code-block">
          <code className="language-javascript">
            {`
              function ProfilePage = () => {
                return (
                  <ErrorBoundary>
                    <Suspense fallback={<Spinner />}>
                      <ProfileDetails />
                    </Suspense>
                  </ErrorBoundary>
                );
              }
            `}
          </code>
        </pre>
        <p>&nbsp;</p>
        <p>Now we’ve orchestrated a view state where the user only sees <code>&lt;Navbar /&gt;</code> and <code>&lt;AppLoading /&gt;</code> and <code>&lt;Toolbar /&gt;</code> until all data has been fetched within <code>&lt;Profile /&gt;</code> and <code>&lt;Friends /&gt;</code>. Thereafter, {`we'll`} see <code>&lt;WidgetLoading /&gt;</code> and <code>&lt;CarouselLoading /&gt;</code>, and these loading states will resolve as their respective children finish their data fetching. Components further down the tree not wrapped in additional Suspense, like <code>&lt;Toolbar /&gt;</code> are free to render while its siblings suspend.</p>
        <p>Suspense is a powerful convenience tool for helping us developers shape cleaner code and provide more responsive applications. Nevertheless, its implementation may still be in flux, so the React team advises us to use caution implementing Suspense in our codebases for anything other than code-splitting.&nbsp;</p>
        <p>Below is a simple demo of React Suspense in action! Feel free to play around with its delay feature or peruse the implementation details to gather a better understand of the Suspense mechanism at work!</p>
        <p>&nbsp;</p>
        <iframe style={{ border: 0, borderRadius: 4, overflow: 'hidden', margin: '0 auto', display: 'block', }} title="introduction-to-react-suspense" xmlns="lang" src="https://codesandbox.io/embed/introduction-to-react-suspense-dr4d41?fontsize=14&amp;hidenavigation=1&amp;theme=dark" width="560" height="315" frameBorder="0" sandbox="allow-forms allow-modals allow-orientation-lock allow-pointer-lock allow-popups allow-popups-to-escape-sandbox allow-presentation allow-same-origin allow-scripts allow-top-navigation-by-user-activation"></iframe>
        <p>&nbsp;</p>
        <p>&nbsp;</p>
        <h3>Is Suspense <em>too suspenseful</em> for you?</h3>
        <p><span>Bitovi has expert React consultants eager to support your project.&nbsp;</span><a href="https://www.bitovi.com/frontend-javascript-consulting/react-consulting" rel="nofollow">Schedule your free consult call</a><span>&nbsp;to unlock solutions to optimize your ReactJS project!</span></p>
        <p>&nbsp;</p>

      </div>
    </div>
  );
}
export default BlogArticle;