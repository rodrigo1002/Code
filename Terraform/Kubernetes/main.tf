provider "kubernetes" {
  config_path             = "${pathexpand("~")}/.kube/config"
  config_context_cluster  = "docker-desktop"
}

resource "kubernetes_deployment" "nginx" {
  metadata {
    name = "nginx"
  }

  spec {
    replicas = 1

    selector {
      match_labels = {
        app = "nginx"
      }
    }

    template {
      metadata {
        labels = {
          app = "nginx"
        }
      }

      spec {
        container {
          image = "nginx:latest"
          name  = "nginx"
          port {
            container_port = 80
          }
        }
      }
    }
  }
}

resource "kubernetes_service" "nginx" {
  metadata {
    name = "nginx-service"
  }

  spec {
    selector = {
      app = kubernetes_deployment.nginx.metadata[0].name
    }

    port {
      port        = 80
      target_port = 80
      node_port   = 30080  # Specify the node port here
    }

    type        = "NodePort"
  }
}

output "nginx_service_name" {
  description = "Name of the NGINX service"
  value       = kubernetes_service.nginx.metadata[0].name
}

output "nginx_service_port" {
  description = "Node port of the NGINX service"
  value       = kubernetes_service.nginx.spec[0].port[0].node_port
}

output "nginx_service_ip" {
  description = "IP address of the NGINX service"
  value       = kubernetes_service.nginx.spec[0].cluster_ip
}

output "nginx_landing_page_url" {
  description = "HTTP URL to access the NGINX landing page"
  value       = "http://${kubernetes_service.nginx.spec[0].cluster_ip}:${kubernetes_service.nginx.spec[0].port[0].node_port}"
}