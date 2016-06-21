package webServices;


import java.io.IOException;
import java.util.Collection;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.ws.rs.Consumes;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.MediaType;

import coupons.beans.Coupon;
import coupons.facades.CustomerFacade;


@Path("/customer")
public class CustomerService {

	@Context
	private HttpServletRequest req;
	@Context
	private HttpServletResponse res;

	@POST
	@Produces(MediaType.APPLICATION_JSON)
	@Consumes(MediaType.APPLICATION_JSON)
	@Path("/coupons")
	public Coupon purchaseCoupon(Coupon coupon) throws IOException {

		try {
			CustomerFacade facade = (CustomerFacade) req.getSession(false).getAttribute("facade");
			facade.purchaseCoupon(coupon);

		} catch (Exception e) {
			res.sendError(550);
		}
		return coupon;
	}

	@GET
	@Produces(MediaType.APPLICATION_JSON)
	@Path("/coupons")
	public Collection<Coupon> getMyCoupons() throws IOException {
		try {
			CustomerFacade facade = (CustomerFacade) req.getSession(false).getAttribute("facade");
		return facade.getAllPurchasedCoupons();
		} catch (Exception e) {
			res.sendError(550);
		}
		return null;
	}

	@GET
	@Produces(MediaType.APPLICATION_JSON)
	@Path("/coupons/all")
	public Collection<Coupon> getAllCoupons() throws IOException {
		try {
			CustomerFacade facade = (CustomerFacade) req.getSession(false).getAttribute("facade");
			return facade.getAllCoupons();
		} catch (Exception e) {
			res.sendError(550);
		}
		return null;
	}
}
