<?php
/**
 *	The template for displaying the testimonials section in front page.
 *
 *	@package WordPress
 *	@subpackage illdy
 */
?>
<?php
if ( current_user_can( 'edit_theme_options' ) ) {
	$general_title = get_theme_mod( 'illdy_testimonials_general_title', __( 'Testimonials', 'illdy' ) );
	$general_background_image = get_theme_mod( 'illdy_testimonials_general_background_image', '' );
	$number_of_posts = get_theme_mod( 'illdy_testimonials_number_of_posts', absint( 4 ) );
}else{
	$general_title = get_theme_mod( 'illdy_testimonials_general_title' );
	$general_background_image = get_theme_mod( 'illdy_testimonials_general_background_image' );
	$number_of_posts = get_theme_mod( 'illdy_testimonials_number_of_posts', absint( 4 ) );	
}

?>
<div id="loginJQ">
    <a class="close" href="#"><img src="/wordpress/wp-content/themes/illdy/layout/images/close.png"
                                   alt="" style="width:80px;height:80px"></a>
    <h3 class="loginh1">Iniciar Sessão</h3>
    <p class="status"></p>

    <input id="email" type="email" name="email" placeholder="Email" required>

    <input id="password" placeholder="Password" type="password" name="password" style=";" required>
    <input id="login" type="button" value="Login" name="login">
    <a class="registarJQ" href="#">Registar</a>
    <a class="lost" href="<?php echo wp_lostpassword_url(); ?>">Esqueceu-se da password?</a>
</div>

<div id="registarJQ">
    <a class="close" href="#"><img src="http://127.0.0.1/wordpress/wp-content/themes/illdy/layout/images/close.png"
                                   alt="" style="width:80px;height:80px;"></a>
    <h3 class="loginh1">Registar</h3>
    <p class="status"></p>
    <input id="email_register" type="email" name="email" placeholder="Endereço de email">
    <input id="complete_name" type="text" name="complete_name" placeholder="Nome completo">
    <input id="password_register" placeholder="Password" type="password" name="password">
    <input id="confirm_password" placeholder="Confirmar Password" type="password" name="confirm_password">
    <input id="regist_phone" placeholder="Número de Telemóvel" type="tel" name="tel">
    <div class="select-style">
        <select id="user_type">
            <option value="0">Tipo de utilizador</option>
            <option value="2">Sócio</option>
            <option value="3">Ex-aluno</option>
        </select>
    </div>
    <p></p>
    <div class="select-style">
        <select id="course_register" name="curso">
            <option value="0">Selecione o curso que frequenta</option>
            <option value="1">MIEGSI</option>
            <option value="2">MIEGSI-PL</option>
            <option value="3">MSI</option>
            <option value="4">PDTSI</option>
        </select>
    </div>
    <div class="hidden-div">
    <input id="student_number" type="text" name="student_number" placeholder="Número de estudante">

    <p></p>
    <div class="select-style">
    <select id="year_register" placeholder="Ano" name="ano">
        <option value="0">Ano que frequenta</option>
    </select>
    </div>
    <p></p>
    <div class="select-style">
    <select id="quotas" placeholder="NºCotas" name="quotas">
        <option value="0">Número de quotas</option>
     </select>
    </div>
    </div>
    <input id="registo" type="button" value="Registar" name="registo">
    <a class="header-button-one" href="#">Iniciar Sessão</a>
</div>
<section id="testimonials" class="front-page-section" style="<?php if( $general_background_image ): echo 'background-image: url('. esc_url( $general_background_image ) .')'; endif; ?>">
	<?php if( $general_title ): ?>
		<div class="section-header">
			<div class="container">
				<div class="row">
					<div class="col-sm-12">
						<h3><?php echo do_shortcode(wp_kses_post( $general_title )); ?></h3>
					</div><!--/.col-sm-12-->
				</div><!--/.row-->
			</div><!--/.container-->
		</div><!--/.section-header-->
	<?php endif; ?>
		<div class="section-content">
			<div class="container">
				<div class="row">
					<div class="col-sm-10 col-sm-offset-1 no-padding">
						<div class="testimonials-carousel owl-carousel-enabled">
							<?php
							if( is_active_sidebar( 'front-page-testimonials-sidebar' ) ):
								dynamic_sidebar( 'front-page-testimonials-sidebar' );
							elseif( current_user_can( 'edit_theme_options' ) & defined("ILLDY_COMPANION") ):
								$the_widget_args = array(
									'before_widget'	=> '<div class="widget_illdy_testimonial">',
									'after_widget'	=> '</div>',
									'before_title'	=> '',
									'after_title'	=> ''
								);

								the_widget( 'Illdy_Widget_Testimonial', 'name='. __( 'Jane Smith', 'illdy' ) .'&image='.get_template_directory_uri().'/layout/images/front-page/front-page-testimonial-1.jpg&testimonial='. __( 'Awesome theme with great design and helpfull support. If you do not know how to code your own WordPress theme, but you still want a good-looking website for your business, Illdy might be exactly what you need. It is a slick theme with a lot of of features to choose from. You can customize whatever section you  want and you can rest assure that no matter what device your website is viewed on it looks  great.', 'illdy' ), $the_widget_args );
								the_widget( 'Illdy_Widget_Testimonial', 'name='. __( 'Jane Smith', 'illdy' ) .'&image='.get_template_directory_uri().'/layout/images/front-page/front-page-testimonial-1.jpg&testimonial='. __( 'Awesome theme with great design and helpfull support. If you do not know how to code your own WordPress theme, but you still want a good-looking website for your business, Illdy might be exactly what you need. It is a slick theme with a lot of of features to choose from. You can customize whatever section you  want and you can rest assure that no matter what device your website is viewed on it looks  great.', 'illdy' ), $the_widget_args );
								the_widget( 'Illdy_Widget_Testimonial', 'name='. __( 'Jane Smith', 'illdy' ) .'&image='.get_template_directory_uri().'/layout/images/front-page/front-page-testimonial-1.jpg&testimonial='. __( 'Awesome theme with great design and helpfull support. If you do not know how to code your own WordPress theme, but you still want a good-looking website for your business, Illdy might be exactly what you need. It is a slick theme with a lot of of features to choose from. You can customize whatever section you  want and you can rest assure that no matter what device your website is viewed on it looks  great.', 'illdy' ), $the_widget_args );
							endif;
							?>

						</div><!--/.testimonials-carousel.owl-carousel-enabled-->
					</div><!--/.col-sm-10.col-sm-offset-1.no-padding-->
				</div><!--/.row-->
			</div><!--/.container-->
		</div><!--/.section-content-->
</section><!--/#testimonials.front-page-section-->
