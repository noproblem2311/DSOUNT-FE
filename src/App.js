import React from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from 'react-router-dom';
import RecordList from './components/record/RecordList'; // Component hiển thị danh sách video
import RecordDetail from './components/record/RecordDetail'; // Component hiển thị chi tiết video
import MainLayout from './components/layout/MainLayout'; // Component layout chính

function App() {
  return (
    <Router>
   
      <MainLayout> {/* MainLayout bây giờ bọc quanh các Routes */}
        <Routes>
          <Route path="/records/" element={<RecordList />} />
          <Route path="/record/:id" element={<RecordDetail />} />
          {/* Thêm các Route khác nếu cần */}
        </Routes>
      </MainLayout>
    </Router>
  );
}

export default App;
