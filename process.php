<?php 
//config
$sendto = 'as.yannainghtun@gmail.com';
$subject = 'New Quote Request or Inquiry';

if ( !empty($_POST)){
    //whitelist
    $name = $_POST['name'];
    $from = $_POST['email'];
    $message = $_POST['message'];
    $honeypot = $_POST['url'];

    //check honeypot

    if ( !empty($honeypot)){
        echo json_encode(array('status'=>0, 'message'=>'There was a problem'));

        die();
    }

    // Check for empty values

    if( empty( $name ) || empty ( $from ) || empty( $message )){
        echo json_encode(array('status'=>0, 'message'=>'A required field(s) is messing'));
        die();
    }

    // Check for valid email address

    $form = filter_var($from, FILTER_VALIDATE_EMAIL);
    
    if ( !$from ){
        echo json_encode(array('status'=>0, 'message'=>'Not a valid email'));
        die();
    }
    $header = sprintf('From: %s', $from) ."\r\n";
    $header .= sprintf('Reply-To: %s', $from) ."\r\n";
    $header .= sprintf('X-Mailer: PHP%s', phpversion());

    if (mail($sendto, $subject, $message, $header )){
        echo json_encode(array('status'=>1, 'message'=>'Email Sent Successfully'));
        die();
    }
    echo json_encode(array('status'=>0, 'message'=>'Email was not sent successfully'));
}
else{
    echo "Please fill in the form";
}

?>