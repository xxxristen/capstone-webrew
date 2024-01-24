package app.vercel.webrew.controller;

import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;

@Controller
public class LoginController {

    // Method - DRY
    private String handleAuthenticatedUser(String returnValue, Model model) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String username = authentication.getName();
        model.addAttribute("username", username);
        return returnValue;
    }

    @GetMapping("/index.html")
    public String redirectToRoot() {
        return "redirect:/";
    }

    @GetMapping("/")
    public String indexPage(String returnValue, Model model) {
        return handleAuthenticatedUser("index", model);
    }

    @GetMapping({"/login-page","/login-page.html"})
    public String loginPage(String returnValue, Model model) {
        return handleAuthenticatedUser("login-page.html", model);
    }

    @GetMapping({"/our-story","/our-story.html"})
    public String aboutUs(String returnValue, Model model) {
        return handleAuthenticatedUser("our-story.html", model);
    }

    @GetMapping({"/products","/products.html"})
    public String productsPage(String returnValue, Model model) {
        return handleAuthenticatedUser("products.html", model);
    }

    @GetMapping("/products.html?type=**")
    public String productsPageParam(String returnValue, Model model, @RequestParam(value="type", required = false) String productType) {
        return handleAuthenticatedUser("products.html?type="+productType, model);
    }

    @GetMapping({"/add-product", "/add-product.html"})
    public String addProductsPage(String returnValue, Model model) {
        return handleAuthenticatedUser("add-product.html", model);
    }

    @GetMapping({"/product-details", "/product-details.html"})
    public String productDetailsPage(String returnValue, Model model) {
        return handleAuthenticatedUser("product-details.html", model);
    }

    @GetMapping("/product-details.html?id=*")
    public String productDetailsPageParam(String returnValue, Model model, @RequestParam(value="id") Integer id) {
        return handleAuthenticatedUser("product-details.html?id="+id, model);
    }

    @GetMapping({"/update-product", "/update-product.html"})
    public String updateProductPage(String returnValue, Model model) {
        return handleAuthenticatedUser("update-product.html", model);
    }
    @GetMapping("/update-product.html?id=*")
    public String updateProductParam(String returnValue, Model model, @RequestParam(value="id") Integer id) {
        return handleAuthenticatedUser("update-product.html?id="+id, model);
    }

    @GetMapping({"/enquiry-form", "/enquiry-form.html"})
    public String enquiryForm(String returnValue, Model model) {
        return handleAuthenticatedUser("enquiry-form.html", model);
    }

    @GetMapping({"/404","/404.html"})
    public String error404Page(String returnValue, Model model) {
        return handleAuthenticatedUser("404.html", model);
    }

    @GetMapping({"/40x", "/40x.html"})
    public String error40xPage(String returnValue, Model model) {
        return handleAuthenticatedUser("40x.html", model);
    }

    @GetMapping({"/400", "/400.html"})
    public String error400Page(String returnValue, Model model) {
        return handleAuthenticatedUser("400.html", model);
    }

    @GetMapping({"/error","/error.html"})
    public String errorPage(String returnValue, Model model) {
        return handleAuthenticatedUser("error.html", model);
    }
}
