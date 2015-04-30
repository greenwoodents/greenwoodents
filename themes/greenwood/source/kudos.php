<?php
  $projectName = 'salesLayer';
  //$projectName = htmlspecialchars($_GET['projectName']);

  $fileName = 'data.json';
  $content = file_get_contents($fileName);

  if ($content) {
    $contentDecoded = json_decode($content);

    foreach($contentDecoded as $key => $project)
    {
      if($project->projectName == $projectName)
      {
        $likes = $project->likes;
        $contentDecoded[$key]->likes = ($likes + 1);
      }
    }
    $contentEncoded = json_encode($contentDecoded);
    file_put_contents($fileName, $contentEncoded);
  }
?>
