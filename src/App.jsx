import CourseList from './components/CourseList.jsx';

export default function App() {
  return (
    <main className="page">
      <header className="hero">
        <div><p className="topline">OSS WEEK 11 Assignment</p><h1>Course Manager</h1><p className="subtitle">React Component, Props & State Practice</p></div>
        <span className="tag">STUDENT: 박은별</span>
      </header>
      <CourseList />
      <footer className="bottom"><span>OSS Week 11 · React</span><span>Local state only · Refresh resets data</span></footer>
    </main>
  );
}
