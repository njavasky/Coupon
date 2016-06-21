package webServices;

import java.io.IOException;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.core.Context;

import couponSystem.CouponSystem;
import coupons.exceptions.CouponSystemException.CouponSystemException;
import coupons.facades.CouponClientFacade;
import coupons.facades.FacadeType;

@Path("app")
public class AppService {

	@Context
	private HttpServletRequest req;
	@Context
	private HttpServletResponse res;

	@POST
	@Path("/login/{name}/{password}/{clientType}")
	public void login(@PathParam("name") String name, @PathParam("password") String password,
			@PathParam("clientType") String type) throws IOException {

		try {
			HttpSession session = req.getSession(false);
			// Check if already have a session and invalidate it.
			if (session != null) {
				session.invalidate();
			}
			CouponSystem cs = CouponSystem.getInstance();
			CouponClientFacade facade;
				
			facade = cs.login(name, password, FacadeType.valueOf(type.toUpperCase()));
			session = req.getSession(true);
						session.setAttribute("facade", facade);
				session.setAttribute("name", name);
				session.setAttribute("type", type);
		} catch (CouponSystemException e) {
			res.addHeader("message", e.getMessage());
			res.sendError(550);
		} catch (Exception e) {
			res.sendError(550);
		}
	}

	@POST
	@Path("/logout")
	public void logout() {
		if (req.getSession(false) != null) {
		req.getSession(false).invalidate();
	}
	}
}
	
