<script setup>
import { ref, onMounted } from 'vue';

// ref to store the element
const mainNavRef = ref(null);

onMounted(() => {
  var navbarShrink = function () {
        const navbarCollapsible = document.body.querySelector('#mainNav');
        if (!navbarCollapsible) {
            return;
        }
        if (window.scrollY === 0) {
            navbarCollapsible.classList.remove('navbar-shrink')
        } else {
            navbarCollapsible.classList.add('navbar-shrink')
        }

    };

    // Shrink the navbar 
    navbarShrink();

    // Shrink the navbar when page is scrolled
    document.addEventListener('scroll', navbarShrink);

    // Activate Bootstrap scrollspy on the main nav element
    const mainNav = document.body.querySelector('#mainNav');
    if (mainNav) {
        new bootstrap.ScrollSpy(document.body, {
            target: '#mainNav',
            rootMargin: '0px 0px -40%',
        });
    };

    // Collapse responsive navbar when toggler is visible
    const navbarToggler = document.body.querySelector('.navbar-toggler');
    const responsiveNavItems = [].slice.call(
        document.querySelectorAll('#navbarResponsive .nav-link')
    );
    responsiveNavItems.map(function (responsiveNavItem) {
        responsiveNavItem.addEventListener('click', () => {
            if (window.getComputedStyle(navbarToggler).display !== 'none') {
                navbarToggler.click();
            }
        });
    });

});

</script>

<template>
          <!-- Masthead-->
        <header class="masthead">
            <div class="container position-relative">
                <div class="row justify-content-center">
                    <div class="col-xl-6">
                        <div class="text-center text-white">
                            <!-- Page heading-->
                            <div class="animation-container">
    <div class="title" id="title1">
      <span class="wave-animation" style="--index: 1;"><font-awesome-icon :icon="['fas', 'plane']" style="color: #ffffff;" /> W</span>
      <span class="wave-animation" style="--index: 2;">a</span>
      <span class="wave-animation" style="--index: 3;">n</span>
      <span class="wave-animation" style="--index: 4;">d</span>
      <span class="wave-animation" style="--index: 5;">e</span>
      <span class="wave-animation" style="--index: 6;">r</span>
      <span class="wave-animation" style="--index: 7;">W</span>
      <span class="wave-animation" style="--index: 8;">a</span>
      <span class="wave-animation" style="--index: 9;">y</span>
    </div>
    <div class="title" id="title2">여행계획을 세워보세요!</div>
  </div>
                            <!-- Signup form-->
                            <!-- * * * * * * * * * * * * * * *-->
                            <!-- * * SB Forms Contact Form * *-->
                            <!-- * * * * * * * * * * * * * * *-->
                            <!-- This form is pre-integrated with SB Forms.-->
                            <!-- To make this form functional, sign up at-->
                            <!-- https://startbootstrap.com/solution/contact-forms-->
                            <!-- to get an API token!-->
                            <form class="form-subscribe" id="contactForm" data-sb-form-api-token="API_TOKEN">
                                <!-- Email address input-->
                                <div class="row">
                                    <div class="col">
                                        <input class="form-control form-control-lg" id="emailAddress" type="email" placeholder="가고싶은 여행지를 입력하세요." data-sb-validations="required,email" />
                                        <div class="invalid-feedback text-white" data-sb-feedback="emailAddress:required">Email Address is required.</div>
                                        <div class="invalid-feedback text-white" data-sb-feedback="emailAddress:email">Email Address Email is not valid.</div>
                                    </div>
                                    <div class="col-auto"><button class="btn btn-primary btn-lg" id="submitButton" type="submit">GO</button></div>
                                </div>
                                <!-- Submit success message-->
                                <!---->
                                <!-- This is what your users will see when the form-->
                                <!-- has successfully submitted-->
                                <div class="d-none" id="submitSuccessMessage">
                                    <div class="text-center mb-3">
                                        <div class="fw-bolder">Form submission successful!</div>
                                        <p>To activate this form, sign up at</p>
                                        <a class="text-white" href="https://startbootstrap.com/solution/contact-forms">https://startbootstrap.com/solution/contact-forms</a>
                                    </div>
                                </div>
                                <!-- Submit error message-->
                                <!---->
                                <!-- This is what your users will see when there is-->
                                <!-- an error submitting the form-->
                                <div class="d-none" id="submitErrorMessage"><div class="text-center text-danger mb-3">Error sending message!</div></div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
            <video autoplay muted loop class="background-video">
      <source src="@/assets/img/bg-main.mp4" type="video/mp4">
      Your browser does not support the video tag.
    </video>
        </header>
        <!-- Icons Grid-->
        <section class="features-icons bg-light text-center" id="card-section">
            <div class="container">
                <div class="row">
                    <div class="col-lg-4">
                        <div class="features-icons-item mx-auto mb-5 mb-lg-0 mb-lg-3">
                            <font-awesome-icon :icon="['far', 'calendar-check']" size="2xl" style="color: #251f51;" class="fi"/>
                            <h3 class="bold">여행일정을 세워요</h3>
                            <p class="regular">직접 계획할 수 있음은 물론, 다른사람의 계획을 가져오거나 AI와 짤수도있습니다.</p>
                        </div>
                    </div>
                    <div class="col-lg-4">
                        <div class="features-icons-item mx-auto mb-5 mb-lg-0 mb-lg-3">
                           <font-awesome-icon :icon="['fas', 'share-nodes']" size="2xl" style="color: #251f51;" class="fi" />
                            <h3 class="bold">루트를 공유해요</h3>
                            <p class="regular">완성한 여행계획을 사람들에게 공유해 보세요. 다양한 조건을 통해 검색됩니다.</p>
                        </div>
                    </div>
                    <div class="col-lg-4">
                        <div class="features-icons-item mx-auto mb-0 mb-lg-3">
                          <font-awesome-icon :icon="['fas', 'fire']" size="2xl" style="color: #251f51;"  class="fi"/>
                            <h3 class="bold">핫플레이스를 검색해요</h3>
                            <p class="regular">우리나라의 핫플레이스를 위치별로 분류하여 한눈에 알아볼 수 있습니다.</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>

</template>

<style scoped>
@import './styles.css';
@import url("https://fonts.googleapis.com/css2?family=Abhaya+Libre:wght@500;800&display=swap");
@font-face {
  font-family: "notosans-bold";
  src: url("/font/NotoSansKR-Bold.ttf");
}

@font-face {
  font-family: "notosans-regular";
  src: url("/font/NotoSansKR-Regular.ttf");
}

.fi {
  margin-bottom: 20px;
}
.animation-container {
  text-align: center;
}
#card-section {
  /* border: 1px solid black; */
  margin-top: 300px;
}
.title {
  font-size: 2rem;
  font-family: "notosans-bold";
  color: white;
}
#title1{
  font-size: 3rem;
}
.bold {
  font-size: 2rem;
  font-family: "notosans-bold";
  color: rgb(0, 0, 0);
}
.regular {
  font-size: 1.2rem;
  font-family: "notosans-regular";
  color: rgb(0, 0, 0);
}
#title2 {
  margin-bottom: 40px;
}

#submitButton{
  background-color: rgb(120, 109, 184);
  border: 1px solid rgb(120, 109, 184);
}

#emailAddress{
  border: 1px solid rgb(120, 109, 184);
}
.wave-animation {
  display: inline-block;
  animation: wave 1s infinite alternate;
}
@keyframes wave {
  to {
    transform: translateY(-20px);
  }
}
</style>
