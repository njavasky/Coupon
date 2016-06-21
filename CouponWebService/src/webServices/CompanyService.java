package webServices;

import java.io.IOException;
import java.util.Collection;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.ws.rs.Consumes;
import javax.ws.rs.DELETE;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.PUT;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.MediaType;

import coupons.beans.Coupon;
import coupons.facades.CompanyFacade;

@Path("/company")
public class CompanyService {

	@Context
	private HttpServletRequest req;
	@Context
	private HttpServletResponse res;

	@POST
	@Consumes(MediaType.APPLICATION_JSON)
	@Path("/coupons")
	public void createCoupon(Coupon coupon) throws IOException {
		try {
			CompanyFacade facade = (CompanyFacade) req.getSession(false).getAttribute("facade");
			facade.createCoupon(coupon);
		} catch (Exception e) {
			res.sendError(550);
	}
	}

	@DELETE
	@Path("/coupons/{id}")
	public void removeCoupon(@PathParam("id") Long id) throws IOException {
		try {
			Coupon coupon = new Coupon();
			coupon.setCouponId(id);
			CompanyFacade facade = (CompanyFacade) req.getSession(false).getAttribute("facade");
			facade.removeCoupon(coupon);
		} catch (Exception e) {
			res.sendError(550);
		}
	}

	@PUT
	@Consumes(MediaType.APPLICATION_JSON)
	@Path("/coupons")
	public void updateCoupon(Coupon coupon) throws IOException {
		try {
			CompanyFacade facade = (CompanyFacade) req.getSession(false).getAttribute("facade");
			facade.updateCoupon(coupon);
		} catch (Exception e) {
			res.sendError(550);
		}
	}

	@GET
	@Produces(MediaType.APPLICATION_JSON)
	@Path("/coupons")
	public Collection<Coupon> getAllCoupons() throws IOException {
		try {
			CompanyFacade facade = (CompanyFacade) req.getSession(false).getAttribute("facade");
			return facade.getCoupons();
		} catch (Exception e) {
			res.sendError(550);
		}
		return null;
	}

}
