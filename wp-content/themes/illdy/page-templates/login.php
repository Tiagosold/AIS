<?php
/**
 *
 * Template name: Login
 * Created by PhpStorm.
 * User: tiago
 * Date: 20/03/2017
 * Time: 22:28
 */

get_header();
if(isset($_SESSION['idType'])){
    echo "hello";
}
?>
    <div class="container">
        <div class="row">
            <div class="col-sm-12">
                <section id="blog">
                    <form method="POST">
                    <label> Endereço de Email: <input type="text" id="email" name="email" class="txt" required /> </label>
                    </br>
                    <label> Palavra Passe: <input type="password" id="password" name="password" class="txt" required/> </label>
                    <input type="button" id="login" value="Submeter"></input>
                        <input type="button" id="loginsaf" value="Submeter"></input>
                        <p id="demo"><?php $_SESSION['idType']?></p>
                    </form>
                </section><!--/#blog-->
            </div><!--/.col-sm-12-->
        </div><!--/.row-->
    </div><!--/.container-->

<?php get_footer(); ?>