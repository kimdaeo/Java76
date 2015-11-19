package java76.pms.servlet;

import java.io.IOException;
import java.io.PrintWriter;
import java.sql.Date;

import javax.servlet.RequestDispatcher;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import java76.pms.ContextLoader;
import java76.pms.dao.ProjectDao;
import java76.pms.domain.Project;

public class ProjectUpdateServlet extends HttpServlet {  
  private static final long serialVersionUID = 1L;

  @Override
  public void doGet(
      HttpServletRequest request, HttpServletResponse response) 
      throws ServletException, IOException {
    try {
      Project project = new Project();
      project.setTitle(request.getParameter("title"));
      project.setStartDate(Date.valueOf(request.getParameter("startDate")));
      project.setEndDate(Date.valueOf(request.getParameter("endDate")));
      project.setMember(request.getParameter("member"));
      project.setNo(Integer.parseInt(request.getParameter("no")));
  
      response.setContentType("text/plain;charset=UTF-8");
      PrintWriter out = response.getWriter();
      ProjectDao projectDao = ContextLoader.context.getBean(ProjectDao.class);
      if (projectDao.update(project) > 0) {
        out.println("변경되었습니다.");
      } else {
        out.println("해당 프로젝트가 존재하지 않습니다");
      }
  
      RequestDispatcher rd = request.getRequestDispatcher("/copyright");
      rd.include(request, response);
      
      response.setHeader("Refresh", "1;url=list");
    } catch (Exception e) {
      RequestDispatcher rd = request.getRequestDispatcher("/error");
      rd.forward(request, response);
    }
  }
}



