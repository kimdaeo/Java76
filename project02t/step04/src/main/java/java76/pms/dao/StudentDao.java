package java76.pms.dao;

import java.util.List;

import org.apache.ibatis.session.SqlSession;
import org.apache.ibatis.session.SqlSessionFactory;

import java76.pms.annotation.Component;
import java76.pms.domain.Student;

@Component
public class StudentDao {
  SqlSessionFactory sqlSessionFactory;
  
  public void setSqlSessionFactory(SqlSessionFactory sqlSessionFactory) {
    this.sqlSessionFactory = sqlSessionFactory;
  }
  
  public StudentDao() {}

  public List<Student> selectList() {
    SqlSession sqlSession = sqlSessionFactory.openSession();
    try {
      return sqlSession.selectList("java76.pms.dao.StudentDao.selectList");
    } finally {
      try {sqlSession.close();} catch (Exception e) {}
    }
  }

  public int insert(Student student) {
    SqlSession sqlSession = sqlSessionFactory.openSession(true);
    try {
      return sqlSession.insert("java76.pms.dao.StudentDao.insert", student);
    } finally {
      try {sqlSession.close();} catch (Exception e) {}
    }
  }

  public int delete(String email) {
    SqlSession sqlSession = sqlSessionFactory.openSession(true);
    try {
      return sqlSession.delete("java76.pms.dao.StudentDao.delete", email);
    } finally {
      try {sqlSession.close();} catch (Exception e) {}
    }
  }
  
  public int update(Student student) {
    SqlSession sqlSession = sqlSessionFactory.openSession(true);
    try {
      return sqlSession.update("java76.pms.dao.StudentDao.update", student);
    } finally {
      try {sqlSession.close();} catch (Exception e) {}
    }
  }
}







