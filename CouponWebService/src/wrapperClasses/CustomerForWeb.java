package wrapperClasses;

import java.util.Collection;

import javax.xml.bind.annotation.XmlRootElement;

import coupons.beans.Coupon;

@XmlRootElement
public class CustomerForWeb {
	private long customerId;
	private String customerName;
	private Collection<Coupon> coupons;

	public CustomerForWeb() {
		super();
	}

	public long getCustomerId() {
		return customerId;
	}

	public void setCustomerId(long customerId) {
		this.customerId = customerId;
	}

	public String getCustomerName() {
		return customerName;
	}

	public void setCustomerName(String customerName) {
		this.customerName = customerName;
	}

	public Collection<Coupon> getCoupons() {
		return coupons;
	}

	public void setCoupons(Collection<Coupon> coupons) {
		this.coupons = coupons;
	}

}

