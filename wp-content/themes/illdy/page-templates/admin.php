<?php
/**
 *    Template name: Administrador
 *
 * @package WordPress
 * @subpackage illdy
 */
require_once 'wp-content/themes/illdy/session.php';
confirm_admin();
// Pear Mail Library
require_once "wp-content/themes/illdy/Mail-1.4.0/Mail.php";
?>
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Admin Area | Dashboard</title>
    <!-- Bootstrap core CSS -->
    <link href="/wordpress/wp-content/themes/illdy/layout/css/bootstrap.min.css" rel="stylesheet">
    <link href="/wordpress/wp-content/themes/illdy/layout/css/style-admin.css" rel="stylesheet">
    <link href="/wordpress/wp-content/themes/illdy/layout/css/jquery.dataTables.min.css" rel="stylesheet">
    <link href="/wordpress/wp-content/themes/illdy/js/jquery_ui/jquery-ui.css" rel="stylesheet">
    <script src="/wordpress/wp-content/themes/illdy/jsautoload/jquery.js"></script>
    <script src="/wordpress/wp-content/themes/illdy/jsautoload/jquery-1.11.2.min.js"></script>
    <script src="/wordpress/wp-content/themes/illdy/js/bootstrap.min.js"></script>
    <script src="/wordpress/wp-content/themes/illdy/js/jquery.dataTables.min.js"></script>
    <script src="/wordpress/wp-content/themes/illdy/js/jquery_ui/jquery-ui.js"></script>
    <script src="/wordpress/wp-content/themes/illdy/jsautoload/lAdmin.js"></script>
    <script src="/wordpress/wp-content/themes/illdy/jsautoload/lassociate.js"></script>
    <script src="/wordpress/wp-content/themes/illdy/jsautoload/lfunctions.js"></script>
    <script src="http://cdn.ckeditor.com/4.6.1/standard/ckeditor.js"></script>
</head>
<body>

<nav class="navbar navbar-default">
    <div class="container">
        <div class="navbar-header">
            <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar"
                    aria-expanded="false" aria-controls="navbar">
                <span class="sr-only">Toggle navigation</span>
                <span class="icon-bar"></span>
                <span class="icon-bar"></span>
                <span class="icon-bar"></span>
            </button>
            <a class="navbar-brand" href="#">AdminStrap</a>
        </div>
        <div id="navbar" class="collapse navbar-collapse">
            <ul class="nav navbar-nav">
                <li class="active"><a href="index.html">Dashboard</a></li>
                <li><a href="pages.html">Pages</a></li>
                <li><a href="posts.html">Posts</a></li>
                <li><a href="users.html">Users</a></li>
            </ul>
            <ul class="nav navbar-nav navbar-right">
                <li><a href="#">Bem vindo, Admin</a></li>
                <li><a href="../wp-content/themes/illdy/session.php?logout">Logout</a></li>
            </ul>
        </div><!--/.nav-collapse -->
    </div>
</nav>

<header id="header">
    <div class="container">
        <div class="row">
            <div class="col-md-10">
                <h1><span class="glyphicon glyphicon-cog" aria-hidden="true"></span> Dashboard
                    <small>Manage Your Site</small>
                </h1>
            </div>
            <div class="col-md-2">
                <div class="dropdown create">
                    <button class="btn btn-default dropdown-toggle" type="button" id="dropdownMenu1"
                            data-toggle="dropdown" aria-haspopup="true" aria-expanded="true">
                        Create Content
                        <span class="caret"></span>
                    </button>
                    <ul class="dropdown-menu" aria-labelledby="dropdownMenu1">
                        <li><a type="button" data-toggle="modal" data-target="#addPage">Add Page</a></li>
                        <li><a href="#">Add Post</a></li>
                        <li><a href="#">Add User</a></li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
</header>
<section id="main">
    <div class="container">
        <div class="row">
            <div class="col-md-3">
                <div class="list-group">
                    <a href="index.html" class="list-group-item active main-color-bg">
                        <span class="glyphicon glyphicon-cog" aria-hidden="true"></span> Dashboard
                    </a>
                    <a href="pages.html" class="list-group-item"><span class="glyphicon glyphicon-star"
                                                                       aria-hidden="true"></span> Parcerias <span
                                class="badge">12</span></a>
                    <a href="posts.html" class="list-group-item"><span class="glyphicon glyphicon-pencil"
                                                                       aria-hidden="true"></span> Eventos <span
                                class="badge">33</span></a>
                    <a href="#" id="partners_view" class="list-group-item"><span class="glyphicon glyphicon-user"
                                                                                 aria-hidden="true"></span> Sócios <span
                                class="badge">203</span></a>
                    <a href="users.html" class="list-group-item"><span class="glyphicon glyphicon-eur"
                                                                       aria-hidden="true"></span> Finanças <span
                                class="badge">203</span></a>
                </div>


            </div>
            <div class="col-md-9">
                <!-- Website Overview -->
                <div class=panel-default">
                    <div class="panel-heading main-color-bg">
                        <h3 class="panel-title">Website Overview</h3>
                    </div>
                    <div class="panel-body">
                        <div class="col-md-3">
                            <div class="well dash-box">
                                <h2><span class="glyphicon glyphicon-user" aria-hidden="true"></span> 203</h2>
                                <h4>Users</h4>
                            </div>
                        </div>
                        <div class="col-md-3">
                            <div class="well dash-box">
                                <h2><span class="glyphicon glyphicon-star" aria-hidden="true"></span> 12</h2>
                                <h4>Parcerias</h4>
                            </div>
                        </div>
                        <div class="col-md-3">
                            <div class="well dash-box">
                                <h2><span class="glyphicon glyphicon-pencil" aria-hidden="true"></span> 33</h2>
                                <h4>Eventos</h4>
                            </div>
                        </div>
                        <div class="col-md-3">
                            <div class="well dash-box">
                                <h2><span class="glyphicon glyphicon-stats" aria-hidden="true"></span> 12,334</h2>
                                <h4>Visitors</h4>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Latest Users -->
                <div class="panel panel-default">
                    <div class="panel-heading" id="panel-heading">
                    </div>
                    <div class="panel-body" id="panel-body">
                    </div>
                </div>
            </div>
        </div>
    </div>
</section>
<!--
    <footer id="footer">
      <p>Copyright AdminStrap, &copy; 2017</p>
    </footer>
-->
<!-- Modals -->

<!-- Add Page -->
<div class="modal fade" id="addPage" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">
    <div class="modal-dialog" role="document">
        <div class="modal-content">
            <form>
                <div class="modal-header">
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span
                                aria-hidden="true">&times;</span></button>
                    <h4 class="modal-title" id="myModalLabel">Add Page</h4>
                </div>
                <div class="modal-body">
                    <div class="form-group">
                        <label>Page Title</label>
                        <input type="text" class="form-control" placeholder="Page Title">
                    </div>
                    <div class="form-group">
                        <label>Page Body</label>
                        <textarea name="editor1" class="form-control" placeholder="Page Body"></textarea>
                    </div>
                    <div class="checkbox">
                        <label>
                            <input type="checkbox"> Published
                        </label>
                    </div>
                    <div class="form-group">
                        <label>Meta Tags</label>
                        <input type="text" class="form-control" placeholder="Add Some Tags...">
                    </div>
                    <div class="form-group">
                        <label>Meta Description</label>
                        <input type="text" class="form-control" placeholder="Add Meta Description...">
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
                    <button type="submit" class="btn btn-primary">Save changes</button>
                </div>
            </form>
        </div>
    </div>
</div>
<div id="updateAssociate">
    <a class="close" href="#"><img src="/wordpress/wp-content/themes/illdy/layout/images/close.png"
                                   alt="" style="width:80px;height:80px;"></a>
    <h3 class="loginh1">Editar Sócio</h3>
    <p class="status"></p>
    <input id="email_register" type="email" name="email" placeholder="Endereço de email"><div id="emailmsg" style="color:Red;display:none"></div>
    <div id="emailmsg" style="color:Red; font-size:75%; display:none"></div>
    <input id="complete_name" type="text" name="complete_name" placeholder="Nome completo"><div id="namemsg" style="color:Red;display:none">Nome inválido</div>
    <div id="namemsg" style="color:Red; font-size:75%; display:none"></div>
    <input id="regist_phone" placeholder="Número de Telemóvel" type="tel" name="tel">
    <div id="phonemsg" style="color:Red; font-size:75%; display:none"></div>
    <input id="student_number" type="text" name="student_number" placeholder="Número de estudante">
    <div id="studentmsg" style="color:Red; font-size:75%; display:none"></div>
    <input id="initial_date" type="text" name="initial_date" placeholder="Data inicial">
    <div id="idatemsg" style="color:Red; font-size:75%; display:none"></div>
    <input id="final_date" type="text" name="final_date" placeholder="Data final">
    <div id="fdatemsg" style="color:Red; font-size:75%; display:none"></div>
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
    <div id="coursemsg" style="color:Red; font-size:75%; display:none"></div>
    <p></p>
    <div class="select-style">
        <select id="year_register" placeholder="Ano" name="ano">
            <option value="0">Ano que frequenta</option>
            <option value="1">1º</option>
            <option value="2">2º</option>
            <option value="3">3º</option>
            <option value="4">4º</option>
            <option value="5">5º</option>
        </select>
    </div>
    <div id="yearmsg" style="color:Red; font-size:75%; display:none"></div>
    <p></p>
    <input type="hidden" id="hiddenID">
    <input id="update" type="button" value="Editar" name="edit">
</div>
<div id="dialogOK" title=""></div>
<script>
    CKEDITOR.replace('editor1');
</script>

<!-- Bootstrap core JavaScript
================================================== -->
<!-- Placed at the end of the document so the pages load faster -->

</body>
</html>
