import { useState } from 'react';
import CourseItem from './CourseItem.jsx';
import { initialCourses } from '../data/courses.js';

export default function CourseList() {
  // [제공] 초기 배열을 useState로 관리합니다.
  const [courses, setCourses] = useState(initialCourses);
  const [newName, setNewName] = useState('');
  const [category, setCategory] = useState('Major')
  const [selectedID, setSelectID] = useState(null);
  const [search, setSearch] = useState('');
  const [onlyUncomplete, setOnlyUncomplete] = useState(false);

  // [제공] 삭제 기능: filter로 새 배열을 만들어 업데이트합니다.
  function handleDelete(id) {
    if (!window.confirm('이 과목을 삭제하시겠습니까?')) return;
    setCourses(previous => previous.filter(course => course.id !== id));
  }

  // TODO 1 (필수): 과목 추가 기능을 구현하세요.
  function handleAdd(event) {
    event.preventDefault();
    // TODO: 빈 입력 검사, 새 과목 객체 생성, setCourses 호출, 입력창 초기화
    if(newName === ''){
      alert("과목명을 입력하세요.");
      return;
    }

    if(selectedID === null){
      //add
      const newCourse = { id: courses.length > 0 ? courses[courses.length - 1].id + 1 : 1, name: newName, category: category, completed: false };
      setCourses([...courses, newCourse]);
    }
    else {
      //edit part
      setCourses(previous => previous.map(course => course.id === selectedID ? {...course, name: newName, category: category} : course));
      setSelectID(null);
    }
    setNewName('');
  }

  // TODO 2 (필수): 완료 상태 변경 기능을 구현하세요.
  function handleToggle(id) {
    // TODO: map과 spread(...)를 사용하여 해당 id의 completed를 반전
    setCourses(previous => previous.map(course => course.id === id ? {...course, completed: !course.completed} : course));
  }

  //과목명 수정 기능
  function handleEdit(id) {
    const selected = courses.find(course => course.id === id);
    setNewName(selected.name);
    setSelectID(id);
  }

  //미완료 표시
  // const filteredCourses = onlyUncomplete
  // ? courses.filter(course => !course.completed)
  // : courses;

  //검색
  // const filteredCourses = courses.filter(course =>
  //   course.name.toLowerCase().includes(search.toLowerCase())
  // );

  //완료/미완료 필터링 + 과목명 검색 기능
  const filteredCourses = courses.filter(course =>
    (!onlyUncomplete || !course.completed) &&
    course.name.toLowerCase().includes(search.toLowerCase())
  );

  const doneCount = courses.filter(course => course.completed).length;

  return (
    <>
      <section className="stats" aria-label="과목 통계">
        <div className="stat"><span>전체 과목</span><strong>{courses.length}</strong></div>
        <div className="stat"><span>완료</span><strong className="green">{doneCount}</strong></div>
        <div className="stat"><span>진행 중</span><strong className="blue">{courses.length - doneCount}</strong></div>
      </section>
      <section className="panel">
        <div className="panel-header"><h2>My Courses</h2><span className="small-note">{courses.length} courses</span></div>
        <p className="todo">실습 과제: 아래 Add 버튼과 완료 체크박스의 기능을 직접 구현하세요.</p>
        <form className="add-form" onSubmit={handleAdd}>
          <input className="input" value={newName} onChange={event => setNewName(event.target.value)} placeholder="새 과목명을 입력하세요" aria-label="새 과목명" />
          <select className="btn secondary dropdown" value={category} onChange={event => setCategory(event.target.value)}>
            <option value="Major">Major</option>
            <option value="Elective">Elective</option>
          </select>
          <button className="btn primary" type="submit">{selectedID !== null ? 'Edit Course' : '+ Add Course'}</button>
        </form>
        <div className="filter">
          <input className="check" type="checkbox" checked={onlyUncomplete} onChange={event => setOnlyUncomplete(event.target.checked)}/>
          <label>미완료 과목만 표시</label>
          <input className="input" value={search} onChange={event => setSearch(event.target.value)} placeholder='과목명으로 검색'/>
        </div>
        <div className="list-head"><span>COURSE</span><span>CATEGORY</span><span>ACTIONS</span></div>
        {courses.length === 0 && <div className="empty">등록된 과목이 없습니다.</div>}
        {filteredCourses.map(course => (
          <CourseItem key={course.id} course={course} onDelete={handleDelete} onToggle={handleToggle} onEdit={handleEdit}/>
        ))}
      </section>
    </>
  );
}
