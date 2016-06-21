package webServices;

import java.io.IOException;
import java.util.ArrayList;
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

import coupons.beans.Company;
import coupons.beans.Coupon;
import coupons.beans.Customer;
import coupons.exceptions.Facade.AdminFacadeException;
import coupons.facades.AdminFacade;
import wrapperClasses.CompanyForWeb;
import wrapperClasses.CustomerForWeb;

@Path("/admin")
public class AdminService {
	@Context
	private HttpServletRequest req;
	@Context
	private HttpServletResponse res;

	@POST
	@Consumes(MediaType.APPLICATION_JSON)
	@Path("/companies")
	public void createCompany(Company company) throws IOException {
		try {
			AdminFacade facade = (AdminFacade) req.getSession(false).getAttribute("facade");
			facade.createCompany(company);
		} catch (Exception e) {
			res.sendError(550);
		}
	}

	@DELETE
	@Path("/companies/{id}")
	public void removeCompany(@PathParam("id") Long id) throws IOException {
		try {
			Company company = new Company();
			company.setCompanyId(id);
			AdminFacade facade = (AdminFacade) req.getSession(false).getAttribute("facade");
		facade.removeCompany(company);
		} catch (Exception e) {
			res.sendError(550);
	}
	}

	@PUT
	@Consumes(MediaType.APPLICATION_JSON)
	@Path("/companies")
	public void updateCompany(Company company) throws IOException {
		try {
			AdminFacade facade = (AdminFacade) req.getSession(false).getAttribute("facade");
			facade.updateCompany(company);
		} catch (Exception e) {
			res.sendError(550);
		}
	}


	@GET
	@Produces(MediaType.APPLICATION_JSON)
	@Path("/companies")
	public Collection<CompanyForWeb> getAllCompanies() throws IOException {
		try {
			AdminFacade facade = (AdminFacade) req.getSession(false).getAttribute("facade");
			Collection<Company> companies = facade.getAllCompanies();
			return companyListWrapper(companies);
		} catch (Exception e) {
			res.sendError(550);
		}
		return null;
	}

	@POST
	@Consumes(MediaType.APPLICATION_JSON)
	@Path("/customers")
	public void createCustomer(Customer customer) throws IOException {
		try {
			AdminFacade facade = (AdminFacade) req.getSession(false).getAttribute("facade");
			facade.createCustomer(customer);
		} catch (Exception e) {
			res.sendError(550);
		}
	}

	@DELETE
	@Produces(MediaType.APPLICATION_JSON)
	@Path("/customers/{id}")
	public void removeCustomer(@PathParam("id") Long id) throws IOException {
		try {
			Customer customer = new Customer();
			customer.setCustomerId(id);
			AdminFacade facade = (AdminFacade) req.getSession(false).getAttribute("facade");
		facade.removeCustomer(customer);
		} catch (Exception e) {
			res.sendError(550);
		}
	}

	@PUT
	@Consumes(MediaType.APPLICATION_JSON)
	@Path("/customers")
	public void updateCustomer(Customer customer) throws IOException {
		try {
			AdminFacade facade = (AdminFacade) req.getSession(false).getAttribute("facade");
			facade.updateCustomer(customer);
		} catch (Exception e) {
			res.sendError(550);
		}
	}

	@GET
	@Produces(MediaType.APPLICATION_JSON)
	@Path("/customers")
	public Collection<CustomerForWeb> getAllCustomers() throws IOException {
		try {
			AdminFacade facade = (AdminFacade) req.getSession(false).getAttribute("facade");
			Collection<Customer> customers = facade.getAllCustomers();

			return customerListWrapper(customers);
		} catch (Exception e) {
			res.sendError(550);
		}
		return null;
	}

	@DELETE
	@Path("/coupons/{id}")
	public void removeCoupon(@PathParam("id") Long id) throws IOException {
		try {
			Coupon coupon = new Coupon();
			coupon.setCouponId(id);
			AdminFacade facade = (AdminFacade) req.getSession(false).getAttribute("facade");
		facade.removeCoupon(coupon);
		} catch (Exception e) {
			res.sendError(550);
		}
	}


	@GET
	@Produces(MediaType.APPLICATION_JSON)
	@Path("/coupons")
	public Collection<Coupon> getAllCoupons() throws AdminFacadeException, IOException {
		try {
			AdminFacade facade = (AdminFacade) req.getSession(false).getAttribute("facade");
		return facade.getAllCoupons();
		} catch (Exception e) {
			res.sendError(550);
		}
		return null;
	}

	public CompanyForWeb companyWrapper(Company company) {
		CompanyForWeb webCompany = new CompanyForWeb();
		webCompany.setCompanyId(company.getCompanyId());
		webCompany.setCompanyName(company.getCompanyName());
		webCompany.setEmail(company.getEmail());
		webCompany.setCoupons(company.getCoupons());
		return webCompany;
	}

	public Collection<CompanyForWeb> companyListWrapper(Collection<Company> companies) {
		Collection<CompanyForWeb> webCompanies = new ArrayList<>();
		for (Company company : companies) {
			webCompanies.add(companyWrapper(company));
		}
		return webCompanies;
	}

	public CustomerForWeb customerWrapper(Customer customer) {
		CustomerForWeb webCustomer = new CustomerForWeb();
		webCustomer.setCustomerId(customer.getCustomerId());
		webCustomer.setCustomerName(customer.getCustomerName());
		webCustomer.setCoupons(customer.getCoupons());
		return webCustomer;
	}

	public Collection<CustomerForWeb> customerListWrapper(Collection<Customer> customers) {
		Collection<CustomerForWeb> webCustomers = new ArrayList<>();
		for (Customer customer : customers) {
			webCustomers.add(customerWrapper(customer));
		}
		return webCustomers;
	}

}
