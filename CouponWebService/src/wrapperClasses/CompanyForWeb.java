package wrapperClasses;

import java.util.Collection;

import javax.xml.bind.annotation.XmlRootElement;

import coupons.beans.Coupon;

@XmlRootElement
public class CompanyForWeb {
	private long companyId;
	private String companyName;
	private String email;
	private Collection<Coupon> coupons;

	public CompanyForWeb() {
	}

	public long getCompanyId() {
		return companyId;
	}

	public void setCompanyId(long companyId) {
		this.companyId = companyId;
	}

	public String getCompanyName() {
		return companyName;
	}

	public void setCompanyName(String companyName) {
		this.companyName = companyName;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public Collection<Coupon> getCoupons() {
		return coupons;
	}

	public void setCoupons(Collection<Coupon> coupons) {
		this.coupons = coupons;
	}

}
