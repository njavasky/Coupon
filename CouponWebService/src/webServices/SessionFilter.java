package webServices;

import java.io.IOException;

import javax.servlet.Filter;
import javax.servlet.FilterChain;
import javax.servlet.FilterConfig;
import javax.servlet.ServletException;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

/**
 * Servlet Filter implementation class SessionFilter
 */

public class SessionFilter implements Filter {

	public SessionFilter() {
    }

	public void destroy() {
	}

	public void doFilter(ServletRequest request, ServletResponse response, FilterChain chain) throws IOException, ServletException {
		String type = null;
		HttpServletRequest req = (HttpServletRequest) request;
		HttpServletResponse res = (HttpServletResponse) response;
		
		String uri = req.getRequestURI();
		HttpSession session = req.getSession(false);
		if(session!=null){
			type = ((String) session.getAttribute("type")).toLowerCase();
		}

		boolean loggedIn = session != null && session.getAttribute("name") != null;
		boolean loginRequest = uri.contains("login") || uri.contains("logout");

		if ((loggedIn && uri.contains(type)) || loginRequest) {
			chain.doFilter(request, response);
		} else {
			req.getRequestDispatcher(req.getContextPath() + "/error").forward(req, res);
			return;
		}
	}

	public void init(FilterConfig fConfig) throws ServletException {
	}

}
