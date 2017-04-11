<?php
/**
 *	Template name: registration
 *
 *	The template for displaying Custom Page Template: No Sidebar.
 *
 *	@package WordPress
 *	@subpackage illdy
 */

    ?>
    <?php get_header();?>
    <div class="container">
        <div class="row">
            <div class="col-sm-12">
                <section id="blog">
                    <?php
                    if(isset($_POST['regist'])) {
                        $random = $_POST['random'];
                        $email = $_POST['email'];
                        sendEmail($email, 'Registo AIS.SC', 'Aceda ao link seguinte para validar a sua conta 
                        http://' . $_SERVER['HTTP_HOST'] . '/wordpress/confirmar-registo?id=' . $random);
                    }
                    if(isset($_GET['id'])) {
                        $random = $_GET['id'];
                        ?>
                        <input id="randomValue" value="<?= $random ?>" type="hidden">
                        <h3 id="validateShow"></h3>
                        <script>validateUser($('#randomValue').val())</script>
                        <?php
                    }
                    if(isset($_GET['foo'])){
                        ?>
                        <h3 id="validateFirst">Valide a sua conta no email que indicou</h3>
                        <?php
                    }
                    if(isset($_POST['forgot'])){
                        $random = $_POST['random'];
                        $email = $_POST['email'];
                        $id = $_POST['idAssociate'];
                        sendEmail($email, utf8_decode('Recuperação da password'), 'Aceda ao seguinte link para criar uma nova password para a sua conta
                         http://' . $_SERVER['HTTP_HOST'] . '/wordpress?reg=' . $random.'&ida='. $id);
                    }
                    ?>
                </section><!--/#blog-->
            </div><!--/.col-sm-12-->
        </div><!--/.row-->
    </div><!--/.container-->
    <?php get_footer();
?>