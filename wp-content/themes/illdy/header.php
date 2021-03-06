

<?php
/**
 *    The template for displaying the header.
 *
 * @package    WordPress
 * @subpackage illdy
 */
?>
<?php
$logo_id                   = get_theme_mod( 'custom_logo' );
$logo_image                = wp_get_attachment_image_src( $logo_id, 'full' );
$text_logo                 = get_theme_mod( 'illdy_text_logo', __( 'Illdy', 'illdy' ) );
$jumbotron_general_image   = get_theme_mod( 'illdy_jumbotron_general_image', esc_url( get_template_directory_uri() . '/layout/images/front-page/front-page-header.png' ) );
$jumbotron_single_image    = get_theme_mod( 'illdy_jumbotron_enable_featured_image', false );
$jumbotron_parallax_enable = get_theme_mod( 'illdy_jumbotron_enable_parallax_effect', true );
$preloader_enable          = get_theme_mod( 'illdy_preloader_enable', 1 );

$style = '';

if ( get_option( 'show_on_front' ) == 'page' && is_front_page() ) {
	if ( $jumbotron_general_image ) {
		$style = 'background-image: url(' . esc_url( $jumbotron_general_image ) . ');';
	}
} else if ( ( is_single() || is_page() ) && $jumbotron_single_image == true ) {

	global $post;
	if ( has_post_thumbnail( $post->ID ) ) {
		$style = 'background-image: url(' . esc_url( get_the_post_thumbnail_url( $post->ID, 'full' ) ) . ');';
	}else {
		$style = 'background-image: url(' . get_header_image() . ');';
	}
} else {
	$style = 'background-image: url(' . get_header_image() . ');';
}

$url = get_theme_mod( 'header_image', get_theme_support( 'custom-header', 'default-image' ) );

// append the parallax effect
if ( $jumbotron_parallax_enable == true ) {
	$style .= 'background-attachment: fixed;';
}

if ( ( is_single() || is_page() || is_archive() ) && get_theme_mod( 'illdy_archive_page_background_stretch' ) == 2 ) {
	$style .= 'background-size:contain;background-repeat:no-repeat;';
}
require_once 'session.php';
require_once "wp-content/themes/illdy/Mail-1.4.0/Mail.php";
require_once 'wp-content/themes/illdy/bd/functions/associate.php';

?>
<!DOCTYPE html>
<html <?php language_attributes(); ?>>
<head>
	<meta charset="<?php bloginfo( 'charset' ); ?>" />
	<meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no">
	<?php wp_head(); ?>
</head>
<body <?php body_class(); ?>>
<?php if ( $preloader_enable == 1 ): ?>
	<div class="pace-overlay"></div>
<?php endif; ?>
<header id="header" class="<?php if ( get_option( 'show_on_front' ) == 'page' && is_front_page() ): echo 'header-front-page';
else: echo 'header-blog'; endif; ?>" style="<?php echo $style ?>">
	<div class="top-header">
		<div class="container">
			<div class="row">
				<div class="col-sm-4 col-xs-8">

					<?php if ( ! empty( $logo_image ) ) { ?>
						<?php echo '<a href="' . esc_url( home_url() ) . '"><img src="' . esc_url( $logo_image[0] ) . '" /></a>'; ?>
					<?php } else { ?>
						<?php if ( get_option( 'show_on_front' ) == 'page' ) { ?>
							<a href="<?php echo esc_url( home_url() ); ?>" title="<?php echo esc_attr( $text_logo ); ?>" class="header-logo"><?php echo esc_html( $text_logo ); ?></a>
						<?php } else { // front-page option ?>
							<a href="<?php echo esc_url( home_url() ); ?>" title="<?php echo esc_attr( get_bloginfo( 'name' ) ); ?>" class="header-logo"><?php echo esc_html( get_bloginfo( 'name' ) ); ?></a>
						<?php } ?>
					<?php } ?>

				</div><!--/.col-sm-2-->
				<div class="col-sm-8 col-xs-4">
					<nav class="header-navigation">
					<?php
                    if(!isset($_SESSION['idType'])) {
                        wp_nav_menu(array(
                            'theme_location' => 'primary-menu',
                            'menu' => '',
                            'container' => false,
                            'menu_class' => 'clearfix',
                            'menu_id' => '',
                        ));
                    }else {
                        wp_nav_menu(array(
                            'theme_location' => 'new-menu',
                            'menu' => '',
                            'container' => false,
                            'menu_class' => 'clearfix',
                            'menu_id' => '',
                        ));
                    }
					?>
					</nav>
					<button class="open-responsive-menu"><i class="fa fa-bars"></i></button>
				</div><!--/.col-sm-10-->
			</div><!--/.row-->
		</div><!--/.container-->
	</div><!--/.top-header-->
	<nav class="responsive-menu">
		<ul>
			<?php
                wp_nav_menu(array(
                    'theme_location' => 'primary-menu',
                    'menu' => '',
                    'container' => '',
                    'container_class' => '',
                    'container_id' => '',
                    'menu_class' => '',
                    'menu_id' => '',
                    'items_wrap' => '%3$s',
                ));
			?>
		</ul>
	</nav><!--/.responsive-menu-->
    <div class="col-xs-12 col-sm-12 col-md-6 col-lg-6 col-xs-offset-0 col-sm-offset-0 col-md-offset-3 col-lg-offset-3 toppad">
        <!-- User profile  -->
        <div class="panel panel-info" id="profile-information">
            <div class="panel-heading">
                <h3 class="panel-title"></h3>
            </div>
            <div class="panel-body">
                <div class="row">
                    <div class="col-md-3 col-lg-3 " align="center">
                        <div id="image-place"></div>
                        <br>
                        <form method="post" enctype="multipart/form-data">
                            <label class="btn btn-default btn-file" style="font-size:small">
                            Imagem <input name="file-selected" type="file" style="display:none">
                            </label>
                            <p id="image-selected"></p>
                            <button type="submit" onsubmit="submitImage();" style="display: none;" data-toggle="tooltip" class="btn btn-sm btn-success" id="change-image"><i class="glyphicon glyphicon-ok"></i></button>
                            </form>
                        <?php
                        if(isset($_FILES['file-selected'])) {
                            $uploadfile = $_FILES["file-selected"]["tmp_name"];
                            $folder = "wp-content/themes/illdy/uploads/";
                            move_uploaded_file($_FILES["file-selected"]["tmp_name"], $folder . $_FILES["file-selected"]["name"]);
                            $params = array();
                            $params['id'] = 2;
                            $params['idAssociate'] = $_SESSION['idAssociate'];
                            $params['image'] = $_FILES["file-selected"]["name"];
                            changeAssociateState($params);

                            ?>
                        <?php
                        }
                        ?>
                    </div>
                    <div class=" col-md-9 col-lg-9 ">
                        <table id='userTable' class="table table-user-information">
                            <tbody id="userBody">
                            <div id="dialog-associate" title="Atualização"></div>
                            </tbody>
                        </table>
<!--
                        <a href="#" class="btn btn-primary">My Sales Performance</a>
                        <a href="#" class="btn btn-primary">Team Sales Performance</a>
                        -->
                    </div>
                </div>
            </div>
            <div class="panel-footer">
                <a data-original-title="Broadcast Message" data-toggle="tooltip" type="button" class="btn btn-sm btn-primary"><i class="glyphicon glyphicon-envelope"></i></a>
                <span id="edit-clear" class="pull-right">
                            <a data-original-title="Editar perfil" data-toggle="tooltip" type="button" class="btn btn-sm btn-warning" id="edit-button"><i class="glyphicon glyphicon-edit"></i></a>
                            <a href="/wordpress/wp-content/illdy/session.php?logout" data-original-title="Logout" data-toggle="tooltip" type="button" class="btn btn-sm btn-danger"><i class="glyphicon glyphicon-remove"></i></a>
                        </span>
                <span id="confirm-info" class="pull-right">
                    <button data-original-title="Confirmar mudanças" data-toggle="confirmation" class="btn btn-sm btn-success" id="confirm-button"><i class="glyphicon glyphicon-ok"></i></button>
                    <button data-original-title="Perfil" data-toggle="tooltip" class="btn btn-sm btn-info" id="profile-again"><i class="glyphicon glyphicon-user"></i></button>
                </span>
            </div>
        </div>
    </div>
    <input id="hiddenAssociateId" type="hidden" value="<?=$_SESSION['idAssociate']?>">
    <input id="hiddenControl" type="hidden" value="foo">
    <div id="image-upload">
        <form action="" method="post" enctype="multipart/form-data">
            <input type="file" id="upload_file" name="upload_file" />
            <input type="submit" name='submit_image' value="Upload Image"/>
        </form>
    </div>

    <?php
	if ( get_option( 'show_on_front' ) == 'page' && is_front_page() ):
		get_template_part( 'sections/front-page', 'bottom-header' );
	else:
		get_template_part( 'sections/blog', 'bottom-header' );
	endif;
	?>
    <link href="/wordpress/wp-content/themes/illdy/js/jquery_ui/jquery-ui.css" rel="stylesheet">
    <script src="/wordpress/wp-content/themes/illdy/js/jquery_ui/jquery-ui.js"></script>
</header><!--/#header-->

